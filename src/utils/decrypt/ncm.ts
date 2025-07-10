// 导入工具函数和依赖库
import {
  AudioMimeType, // 音频格式到 MIME 类型的映射表
  BytesHasPrefix, // 判断字节前缀是否匹配
  GetArrayBuffer, // 将浏览器 File 对象转换为 ArrayBuffer
  GetImageFromURL, // 根据封面 URL 获取图片（二进制与 MIME 信息）
  GetMetaFromFile, // 从文件名或歌名中获取歌曲标题和歌手信息
  IMusicMeta, // 自定义的音乐元数据接口，用于写入标签
  SniffAudioExt, // 猜测解密后音频的扩展名（mp3、flac 等）
  WriteMetaToFlac, // 向 Flac 格式写入元数据
  WriteMetaToMp3, // 向 Mp3 格式写入元数据
} from "./utils";

import AES from "crypto-js/aes"; // AES 解密算法
import PKCS7 from "crypto-js/pad-pkcs7"; // AES PKCS7 填充模式
import ModeECB from "crypto-js/mode-ecb"; // AES ECB 模式
import WordArray from "crypto-js/lib-typedarrays"; // 用于处理字节数组
import Base64 from "crypto-js/enc-base64"; // Base64 编码解析
import EncHex from "crypto-js/enc-hex"; // Hex 编码解析
import EncUTF8 from "crypto-js/enc-utf8"; // UTF-8 编码解析

import { Buffer } from "buffer"; // Node.js Buffer
import { parseBlob as metaParseBlob } from "music-metadata"; // 解析 Blob 中的音频元数据

// ncm 文件解密用的核心密钥与元数据密钥（十六进制解析）
const CORE_KEY = EncHex.parse("687a4852416d736f356b496e62617857"); // 解密 RC4 key 的 AES 密钥
const META_KEY = EncHex.parse("2331346C6A6B5F215C5D2630553C2728"); // 解密元数据的 AES 密钥
// ncm 文件的魔数头，用于校验文件是否合法（"CTENFDAM" 对应的字节序列）
const MagicHeader = [0x43, 0x54, 0x45, 0x4e, 0x46, 0x44, 0x41, 0x4d];

// ncm 文件中存储的音乐元数据接口
interface NcmMusicMeta {
  musicName?: string; // 歌曲名称
  artist?: Array<string | number>[]; // 歌手信息数组
  format?: string; // 原始音频格式
  album?: string; // 专辑名称
  albumPic?: string; // 封面 URL
}

// ncm DJ 专辑封装的元数据结构
interface NcmDjMeta {
  mainMusic: NcmMusicMeta;
}

// 解密主类：负责解析并解密 ncm 文件
class NcmDecrypt {
  raw: ArrayBuffer; // 原始文件的 ArrayBuffer
  view: DataView; // DataView 用于按偏移读取二进制数据
  offset: number = 0; // 当前读取偏移位置
  filename: string; // 原始文件名（用于补全元数据）
  format: string = ""; // 解密后音频格式
  mime: string = ""; // 解密后音频的 MIME 类型
  audio?: Uint8Array; // 解密后的音频数据
  blob?: Blob; // 解密后封装为 Blob 对象
  oriMeta?: NcmMusicMeta; // 解密出的原始元数据
  newMeta?: IMusicMeta; // 构建好的、新的元数据对象
  image?: { mime: string; buffer: ArrayBuffer; url: string }; // 封面图信息

  /**
   * 构造函数：校验文件头并初始化内部变量
   * @param buf 文件的 ArrayBuffer
   * @param filename 原始文件名
   */
  constructor(buf: ArrayBuffer, filename: string) {
    const prefix = new Uint8Array(buf, 0, 8);
    // 校验前 8 字节是否为 MagicHeader
    if (!BytesHasPrefix(prefix, MagicHeader)) throw Error("此ncm文件已损坏");
    this.offset = 10; // 跳过文件头与未知字节
    this.raw = buf;
    this.view = new DataView(buf);
    this.filename = filename;
  }

  /**
   * 解密并获取 RC4 密钥数据
   * @returns 去掉协议前缀的 RC4 key 数组
   */
  _getKeyData(): Uint8Array {
    // 读取密钥段长度（4 字节, little-endian）
    const keyLen = this.view.getUint32(this.offset, true);
    this.offset += 4;
    // 读取加密的密钥字节，并逐字节异或 0x64
    const cipherText = new Uint8Array(this.raw, this.offset, keyLen).map(
      (uint8) => uint8 ^ 0x64,
    );
    this.offset += keyLen;

    // 使用 AES-ECB 模式、PKCS7 填充解密得到明文
    const plainText = AES.decrypt(
      // @ts-ignore
      { ciphertext: WordArray.create(cipherText) },
      CORE_KEY,
      { mode: ModeECB, padding: PKCS7 },
    );

    // 将 CryptoJS WordArray 转为 Uint8Array
    const result = new Uint8Array(plainText.sigBytes);
    const words = plainText.words;
    const sigBytes = plainText.sigBytes;
    for (let i = 0; i < sigBytes; i++) {
      result[i] = (words[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
    }

    // 根据协议，前 17 字节为无用前缀，去掉后返回真正的 key
    return result.slice(17);
  }

  /**
   * 生成 RC4 KeyBox（伪随机字节序列）
   * @returns KeyBox，用于对音频内容进行 RC4 解密
   */
  _getKeyBox(): Uint8Array {
    const keyData = this._getKeyData();
    // 初始化 0-255 序列
    const box = new Uint8Array(Array(256).keys());
    const keyDataLen = keyData.length;
    let j = 0;
    // RC4 Key-Scheduling Algorithm (KSA)
    for (let i = 0; i < 256; i++) {
      j = (box[i] + j + keyData[i % keyDataLen]) & 0xff;
      [box[i], box[j]] = [box[j], box[i]];
    }
    // 按协议对 box 做额外一次处理生成最终流密钥表
    return box.map((_, i, arr) => {
      i = (i + 1) & 0xff;
      const si = arr[i];
      const sj = arr[(i + si) & 0xff];
      return arr[(si + sj) & 0xff];
    });
  }

  /**
   * 解密并解析元数据段
   * @returns NcmMusicMeta 原始歌曲元信息
   */
  _getMetaData(): NcmMusicMeta {
    // 读取元数据长度
    const metaDataLen = this.view.getUint32(this.offset, true);
    this.offset += 4;
    if (metaDataLen === 0) return {};

    // 读取加密的 JSON 段，并异或 0x63
    const cipherText = new Uint8Array(this.raw, this.offset, metaDataLen).map(
      (data) => data ^ 0x63,
    );
    this.offset += metaDataLen;

    // 跳过前22字节后解 Base64，再 AES-ECB 解密
    // ts-ignore：构造 ciphertext
    const plainText = AES.decrypt(
      // @ts-ignore
      {
        ciphertext: Base64.parse(
          WordArray.create(cipherText.slice(22)).toString(EncUTF8),
        ),
      },
      META_KEY,
      { mode: ModeECB, padding: PKCS7 },
    ).toString(EncUTF8);

    // 根据前缀判断是否为 DJ 模式
    const labelIndex = plainText.indexOf(":");
    let result: NcmMusicMeta;
    if (plainText.slice(0, labelIndex) === "dj") {
      // DJ 包含 mainMusic 字段
      const tmp: NcmDjMeta = JSON.parse(plainText.slice(labelIndex + 1));
      result = tmp.mainMusic;
    } else {
      // 普通歌曲 JSON
      result = JSON.parse(plainText.slice(labelIndex + 1));
    }
    // 修正封面 URL 为 HTTPS 并添加尺寸参数
    if (result.albumPic) {
      result.albumPic =
        result.albumPic.replace("http://", "https://") + "?param=500y500";
    }
    return result;
  }

  /**
   * 解密音频数据段
   * @param keyBox RC4 KeyBox
   * @returns 解密后的音频字节数组
   */
  _getAudio(keyBox: Uint8Array): Uint8Array {
    // 跳过一段无用头部数据
    this.offset += this.view.getUint32(this.offset + 5, true) + 13;
    const audioData = new Uint8Array(this.raw, this.offset);
    const len = audioData.length;
    // RC4 流式异或解密
    for (let i = 0; i < len; i++) {
      audioData[i] ^= keyBox[i & 0xff];
    }
    return audioData;
  }

  /**
   * 构建新的元数据对象（title, artists, album, picture）
   */
  async _buildMeta() {
    if (!this.oriMeta) throw Error("invalid sequence: oriMeta 未初始化");
    // 从文件名或原始 meta 中补全 title/artist 信息
    const info = GetMetaFromFile(this.filename, this.oriMeta.musicName);

    // 处理歌手列表
    let artists: string[] = [];
    if (this.oriMeta.artist) {
      this.oriMeta.artist.forEach((arr) => artists.push(arr[0] as string));
    }
    // 若元数据中无歌手，再从文件名解析
    if (!artists.length && info.artist) {
      artists = info.artist
        .split(",")
        .map((s) => s.trim())
        .filter((s) => s);
    }

    // 获取并处理封面图片
    if (this.oriMeta.albumPic) {
      try {
        this.image = await GetImageFromURL(this.oriMeta.albumPic);
        // 如果图片超过16MB，可选压缩处理（注释示例）
        if (
          this.image?.buffer.byteLength &&
          this.image.buffer.byteLength >= 1 << 24
        ) {
          // TODO: 使用 jimp 等库压缩图片
        }
      } catch (e) {
        console.warn("获取封面图片失败", e);
      }
    }

    // 构造新的元数据对象
    this.newMeta = {
      title: info.title,
      artists,
      album: this.oriMeta.album,
      picture: this.image?.buffer,
    };
  }

  /**
   * 将元数据写入音频文件（支持 MP3/Flac）
   */
  async _writeMeta() {
    if (!this.audio || !this.newMeta)
      throw Error("invalid sequence: audio/newMeta 未就绪");
    // 如果还未生成 blob，则先创建
    if (!this.blob) this.blob = new Blob([this.audio], { type: this.mime });
    // 解析原始 Blob 中已有的标签
    const ori = await metaParseBlob(this.blob);
    // 判断是否需要写入新标签：当 album、artists、title 都不存在时
    const shouldWrite =
      !ori.common.album && !ori.common.artists && !ori.common.title;

    // 若需要或有封面图，则写入
    if (shouldWrite || this.newMeta.picture) {
      if (this.format === "mp3") {
        // 写入 MP3 ID3 标签
        this.audio = new Uint8Array(
          WriteMetaToMp3(Buffer.from(this.audio), this.newMeta, ori),
        );
      } else if (this.format === "flac") {
        // 写入 Flac 标签
        this.audio = WriteMetaToFlac(
          Buffer.from(this.audio),
          this.newMeta,
          ori,
        );
      } else {
        console.info(`暂不支持 ${this.format} 格式的标签写入`);
        return;
      }
      // 重新生成带标签的 Blob
      this.blob = new Blob([this.audio], { type: this.mime });
    }
  }

  /**
   * 汇总解密结果，返回给调用者
   */
  gatherResult(): DecryptResult {
    if (!this.newMeta || !this.blob) throw Error("bad sequence: 解密结果缺失");
    return {
      title: this.newMeta.title,
      artist: this.newMeta.artists?.join("; "),
      ext: this.format,
      album: this.newMeta.album,
      picture: this.image?.url,
      file: URL.createObjectURL(this.blob), // 浏览器可播放 URL
      blob: this.blob,
      mime: this.mime,
    };
  }

  /**
   * 解密主流程：按顺序调用各步骤函数
   */
  async decrypt() {
    // 1. 生成 RC4 KeyBox
    const keyBox = this._getKeyBox();
    // 2. 解密并读取元数据
    this.oriMeta = this._getMetaData();
    // 3. 解密音频数据
    this.audio = this._getAudio(keyBox);
    // 4. 确定格式：优先使用元数据中的 format，否则猜测扩展名
    this.format = this.oriMeta.format || SniffAudioExt(this.audio);
    // 5. 设置 MIME
    this.mime = AudioMimeType[this.format];
    // 6. 构建新元数据
    await this._buildMeta();
    try {
      // 7. 写入标签
      await this._writeMeta();
    } catch (e) {
      console.warn("写入元数据失败", e);
    }
    // 8. 返回最终解密结果
    return this.gatherResult();
  }
}

/**
 * 对外暴露的异步解密函数
 * @param file 浏览器 File 对象
 * @param raw_filename 原始文件名，用于元数据补全
 */
export async function Decrypt(
  file: File,
  raw_filename: string,
  _: string,
): Promise<DecryptResult> {
  // 先读取 ArrayBuffer，再执行解密流程
  const buf = await GetArrayBuffer(file);
  return new NcmDecrypt(buf, raw_filename).decrypt();
}
