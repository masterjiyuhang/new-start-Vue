import { storage } from "../storage";
import InMemoryStorage from "../storage/InMemoryStorage";
import { splitFilename } from "./utils";
import { Decrypt as NcmDecrypt } from "./ncm";
import { Decrypt as KwmDecrypt } from "./kwm";

export async function Decrypt(
  file: FileInfo,
  config: Record<string, any>,
): Promise<DecryptResult> {
  if (storage instanceof InMemoryStorage) {
    await storage.setAll(config);
  }

  const raw = splitFilename(file.name);
  let rt_data: DecryptResult;
  switch (raw.ext) {
    case "ncm":
      rt_data = await NcmDecrypt(file.raw, raw.name, raw.ext);
      break;
    case "kwm": // Kuwo Mp3/Flac
      rt_data = await KwmDecrypt(file.raw, raw.name, raw.ext);
      break;
    default:
      throw new Error("不支持此文件格式");
  }

  if (!rt_data.rawExt) rt_data.rawExt = raw.ext;
  if (!rt_data.rawFilename) rt_data.rawFilename = raw.name;
  return rt_data;
}
