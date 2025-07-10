import { ID3Writer } from "browser-id3-writer";
import { IAudioMetadata } from "music-metadata";
import MetaFlac from "metaflac-js";

export interface IMusicMeta {
  title: string;
  artists?: string[];
  album?: string;
  albumartist?: string;
  genre?: string[];
  picture?: ArrayBuffer;
  picture_desc?: string;
}

export const split_regex = /[ ]?[,;/_、][ ]?/;

export const FLAC_HEADER = [0x66, 0x4c, 0x61, 0x43];
export const MP3_HEADER = [0x49, 0x44, 0x33];
export const OGG_HEADER = [0x4f, 0x67, 0x67, 0x53];
export const M4A_HEADER = [0x66, 0x74, 0x79, 0x70];
//prettier-ignore
export const WMA_HEADER = [
  0x30, 0x26, 0xb2, 0x75, 0x8e, 0x66, 0xcf, 0x11,
  0xa6, 0xd9, 0x00, 0xaa, 0x00, 0x62, 0xce, 0x6c,
];
export const WAV_HEADER = [0x52, 0x49, 0x46, 0x46];
export const AAC_HEADER = [0xff, 0xf1];
export const DFF_HEADER = [0x46, 0x52, 0x4d, 0x38];
/**
 * 将文件名拆分为名称和扩展名
 *
 * @param filename 完整的文件名，包括扩展名
 * @returns 返回一个对象，包含文件的名称和扩展名
 */
export const splitFilename = (
  filename: string,
): { name: string; ext: string } => {
  // 查找文件名中最后一个点号的位置，用于区分名称和扩展名
  const pos = filename.lastIndexOf(".");

  // 返回文件名的名称部分和扩展名部分
  // 使用toLowerCase方法将扩展名转换为小写，以保持一致性
  return {
    name: filename.substring(0, pos),
    ext: filename.substring(pos + 1).toLowerCase(),
  };
};

/**
 * 判断字节数据是否以指定的前缀开头
 *
 * @param data {Uint8Array} - 待检查的字节数据
 * @param prefix {number[]} - 数字数组表示的前缀
 * @returns {boolean} - 如果字节数据以指定前缀开头返回true，否则返回false
 */
export function BytesHasPrefix(data: Uint8Array, prefix: number[]): boolean {
  // 如果字节数据长度小于前缀长度，直接返回false
  if (data.length < prefix.length) {
    return false;
  }
  // 使用every方法检查data的前缀是否与指定前缀完全匹配
  return prefix.every((v, i) => v === data[i]);
}

export interface IMusicMetaBasic {
  title: string;
  artist?: string;
}

/**
 * 从文件名中提取音乐元数据
 *
 * 该函数旨在通过分析文件名和利用已有的元数据来构建音乐的元数据信息
 * 文件名通过一个分隔符来分割标题和艺术家等信息
 *
 * @param filename 文件名，包含标题和艺术家等信息，通过分隔符分隔
 * @param exist_title 已有的标题信息，如果存在，则优先使用这个值
 * @param exist_artist 已有的艺术家信息，如果存在，则优先使用这个值
 * @param separator 分隔符，默认为"-"，用于分割文件名中的信息
 * @returns 返回一个包含标题和艺术家的音乐元数据对象
 */
export function GetMetaFromFile(
  filename: string,
  exist_title?: string,
  exist_artist?: string,
  separator = "-",
): IMusicMetaBasic {
  // 初始化音乐元数据对象，如果存在标题和艺术家信息，则直接使用
  const meta: IMusicMetaBasic = {
    title: exist_title ?? "",
    artist: exist_artist,
  };

  // 分割文件名，以分隔符为依据
  const items = filename.split(separator);
  // 如果分割后的项多于1个，说明文件名中包含了艺术家和标题信息
  if (items.length > 1) {
    // 如果艺术家信息不存在，或者文件名中的艺术家数量多于已有的艺术家信息，使用文件名中的艺术家信息
    if (
      !meta.artist ||
      meta.artist.split(split_regex).length <
        items[0].trim().split(split_regex).length
    )
      meta.artist = items[0].trim();
    // 如果标题信息不存在，使用文件名中的标题信息
    if (!meta.title) meta.title = items[1].trim();
    // 如果分割后的项等于1个，说明文件名中仅包含标题信息
  } else if (items.length === 1) {
    // 如果标题信息不存在，使用文件名中的标题信息
    if (!meta.title) meta.title = items[0].trim();
  }
  // 返回构建的音乐元数据对象
  return meta;
}

/**
 * 根据给定的URL异步获取图像数据
 *
 * 此函数尝试从指定的URL获取图像数据如果成功，它将返回一个包含图像的MIME类型、字节缓冲区和URL的对象
 * 如果获取过程中出现任何错误，函数将打印警告信息并返回undefined
 *
 * @param src 图像的URL
 * @returns 返回一个Promise，解析为包含图像数据的对象或未定义
 */
export async function GetImageFromURL(
  src: string,
): Promise<{ mime: string; buffer: ArrayBuffer; url: string } | undefined> {
  try {
    // 使用fetch函数从给定的URL获取图像资源
    const resp = await fetch(src);
    // 获取响应的MIME类型
    const mime = resp.headers.get("Content-Type");
    // 检查获取的类型是否为图像
    if (mime?.startsWith("image/")) {
      // 读取图像数据到字节缓冲区
      const buffer = await resp.arrayBuffer();
      // 创建一个对象URL，用于在浏览器中显示图像
      const url = URL.createObjectURL(new Blob([buffer], { type: mime }));
      // 返回包含图像数据和MIME类型的对象
      return { buffer, url, mime };
    }
  } catch (e) {
    // 在出现错误时打印警告信息
    console.warn(e);
  }
}

export function WriteMetaToMp3(
  audioData: Buffer,
  info: IMusicMeta,
  original: IAudioMetadata,
) {
  const writer = new ID3Writer(audioData);

  // reserve original data
  const frames =
    original.native["ID3v2.4"] ||
    original.native["ID3v2.3"] ||
    original.native["ID3v2.2"] ||
    [];
  frames.forEach((frame: any) => {
    if (frame.id !== "TPE1" && frame.id !== "TIT2" && frame.id !== "TALB") {
      try {
        writer.setFrame(frame.id, frame.value);
      } catch (e) {
        console.warn(`failed to write ID3 tag '${frame.id}'`);
      }
    }
  });

  const old = original.common;
  writer
    .setFrame("TPE1", old?.artists || info.artists || [])
    .setFrame("TIT2", old?.title || info.title)
    .setFrame("TALB", old?.album || info.album || "");
  if (info.picture) {
    writer.setFrame("APIC", {
      type: 3,
      data: info.picture,
      description: info.picture_desc || "",
    });
  }
  return writer.addTag();
}

export function WriteMetaToFlac(
  audioData: Buffer,
  info: IMusicMeta,
  original: IAudioMetadata,
) {
  const writer = new MetaFlac(audioData);
  const old = original.common;
  if (!old.title && !old.album && old.artists) {
    writer.setTag("TITLE=" + info.title);
    writer.setTag("ALBUM=" + info.album);
    if (info.artists) {
      writer.removeTag("ARTIST");
      info.artists.forEach((artist) => writer.setTag("ARTIST=" + artist));
    }
  }

  if (info.picture) {
    writer.importPictureFromBuffer(Buffer.from(info.picture));
  }
  return writer.save();
}

export function SniffAudioExt(
  data: Uint8Array,
  fallback_ext: string = "mp3",
): string {
  if (BytesHasPrefix(data, MP3_HEADER)) return "mp3";
  if (BytesHasPrefix(data, FLAC_HEADER)) return "flac";
  if (BytesHasPrefix(data, OGG_HEADER)) return "ogg";
  if (
    data.length >= 4 + M4A_HEADER.length &&
    BytesHasPrefix(data.slice(4), M4A_HEADER)
  )
    return "m4a";
  if (BytesHasPrefix(data, WAV_HEADER)) return "wav";
  if (BytesHasPrefix(data, WMA_HEADER)) return "wma";
  if (BytesHasPrefix(data, AAC_HEADER)) return "aac";
  if (BytesHasPrefix(data, DFF_HEADER)) return "dff";
  return fallback_ext;
}

export const AudioMimeType: { [key: string]: string } = {
  mp3: "audio/mpeg",
  flac: "audio/flac",
  m4a: "audio/mp4",
  ogg: "audio/ogg",
  wma: "audio/x-ms-wma",
  wav: "audio/x-wav",
  dff: "audio/x-dff",
};

/**
 * 从Blob对象中获取ArrayBuffer
 *
 * 此函数用于将Blob对象转换为ArrayBuffer格式这在处理二进制数据时非常有用
 * 如果Blob对象具有arrayBuffer方法，则直接调用该方法返回Promise
 * 否则，使用FileReader对象读取Blob内容，并将结果作为ArrayBuffer返回
 *
 * @param obj Blob对象，包含要转换的数据
 * @returns 返回一个Promise，该Promise解析为ArrayBuffer格式的数据
 */
export function GetArrayBuffer(obj: Blob): Promise<ArrayBuffer> {
  // 检查Blob对象是否具有arrayBuffer方法，如果有则直接调用
  if (!!obj.arrayBuffer) return obj.arrayBuffer();

  // 创建一个新的Promise，用于处理异步读取操作
  return new Promise((resolve, reject) => {
    // 创建FileReader对象，用于读取Blob数据
    const reader = new FileReader();

    // 定义读取完成时的回调函数
    reader.onload = (e) => {
      // 获取读取的结果
      const rs = e.target?.result;
      // 如果结果不存在，则拒绝Promise
      if (!rs) {
        reject("read file failed");
      } else {
        // 否则，解析Promise并返回读取的结果
        resolve(rs as ArrayBuffer);
      }
    };

    // 使用FileReader读取Blob对象为ArrayBuffer
    reader.readAsArrayBuffer(obj);
  });
}

export class DecryptQueue {
  private readonly pending: (() => Promise<void>)[];

  constructor() {
    this.pending = [];
  }

  queue(fn: () => Promise<void>) {
    this.pending.push(fn);
    this.consume();
  }

  private consume() {
    const fn = this.pending.shift();
    if (fn)
      fn()
        .then(() => this.consume)
        .catch(console.error);
  }
}

export enum FilenamePolicy {
  ArtistAndTitle,
  TitleOnly,
  TitleAndArtist,
  SameAsOriginal,
}

export function GetDownloadFilename(
  data: DecryptResult,
  policy: FilenamePolicy,
): string {
  switch (policy) {
    case FilenamePolicy.TitleOnly:
      return `${data.title}.${data.ext}`;
    case FilenamePolicy.TitleAndArtist:
      return `${data.title} - ${data.artist}.${data.ext}`;
    case FilenamePolicy.SameAsOriginal:
      return `${data.rawFilename}.${data.ext}`;
    default:
    case FilenamePolicy.ArtistAndTitle:
      return `${data.artist} - ${data.title}.${data.ext}`;
  }
}

export function sanitizeFilename(filename: string): string {
  return filename.replace(/[^\w.-]+/g, "_");
}
export function DownloadBlobMusic(
  data: DecryptResult,
  policy: FilenamePolicy = FilenamePolicy.TitleAndArtist,
): Promise<void> {
  return new Promise((resolve, reject) => {
    const a = document.createElement("a");
    a.href = data.file;
    a.download = GetDownloadFilename(data, policy);

    try {
      document.body.append(a);
      a.click();
      resolve();
    } catch (error) {
      console.error("下载失败:", error);
      ElMessage.error("下载失败");
      reject(error);
    } finally {
      a.remove();
    }
  });
  // const a = document.createElement("a");
  // a.href = data.file;
  // a.download = GetDownloadFilename(data, policy);
  // document.body.append(a);
  // a.click();
  // a.remove();
}

export function GetCoverFromFile(metadata: IAudioMetadata): string {
  if (metadata.common?.picture && metadata.common.picture.length > 0) {
    return URL.createObjectURL(
      new Blob([metadata.common.picture[0].data], {
        type: metadata.common.picture[0].format,
      }),
    );
  }
  return "";
}
