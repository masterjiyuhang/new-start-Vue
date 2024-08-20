declare module "browser-id3-writer" {
  export default class ID3Writer {
    constructor(buffer: Buffer | ArrayBuffer);

    setFrame(name: string, value: string | object | string[]);

    addTag(): Uint8Array;
  }
}

declare module "metaflac-js" {
  export default class Metaflac {
    constructor(buffer: Buffer);

    setTag(field: string);

    removeTag(name: string);

    importPictureFromBuffer(picture: Buffer);

    save(): Buffer;
  }
}
declare interface DecryptResult {
  title: string;
  album?: string;
  artist?: string;

  mime: string;
  ext: string;

  file: string;
  blob: Blob;
  picture?: string;

  message?: string;
  rawExt?: string;
  rawFilename?: string;
}

declare interface FileInfo {
  status: string;
  name: string;
  size: number;
  percentage: number;
  uid: number;
  raw: File;
}
