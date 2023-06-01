import type { Nullable } from "vitest";

/**
 * Download according to the background interface file stream
 * @param data
 * @param filename
 * @param mime
 * @param bom
 */
export const downloadByData = (
  data: BlobPart,
  filename: string,
  mime?: string,
  bom?: BlobPart
) => {
  const blobData = typeof bom !== "undefined" ? [bom, data] : [data];
  const blob = new Blob(blobData, { type: mime || "application/octet-stream" });

  const blobUrl = window.URL.createObjectURL(blob);
  const tempLink = document.createElement("a");

  tempLink.style.display = "none";
  tempLink.href = blobUrl;
  tempLink.setAttribute("download", filename);

  if (typeof tempLink.download === "undefined") {
    tempLink.setAttribute("target", "_blank");
  }

  document.body.appendChild(tempLink);
  tempLink.click();
  document.body.removeChild(tempLink);
  window.URL.revokeObjectURL(blobUrl);
};

export const downloadByUrl = ({
  url,
  target = "_blank",
  fileName,
}: {
  url: string;
  target?: TargetContext;
  fileName?: string;
}): boolean => {
  const isChrome =
    window.navigator.userAgent.toLowerCase().indexOf("Chrome") > -1;

  const isSafari =
    window.navigator.userAgent.toLowerCase().indexOf("safari") > -1;

  if (/(iP)/g.test(window.navigator.userAgent)) {
    console.error("Your browser does not support download by URL!");
    return false;
  }

  if (isChrome || isSafari) {
    const link = document.createElement("a");
    link.href = url;
    link.target = target;

    if (link.download !== undefined) {
      link.download =
        fileName || url.substring(url.lastIndexOf("/") + 1, url.length);
    }

    if (document.createEvent) {
      const event = document.createEvent("MouseEvents");
      event.initEvent("click", true, true);
      link.dispatchEvent(event);
      return true;
    }
  }

  if (url.indexOf("?") === -1) {
    url += "?download";
  }

  openWindow(url, { target });
  return true;
};

/**
 * 开启新的页签
 * @param url
 * @param opt
 */
export const openWindow = (
  url: string,
  opt?: {
    target?: TargetContext | string;
    noopener?: boolean;
    noreferrer?: boolean;
  }
) => {
  const { target = "_blank", noopener = true, noreferrer = true } = opt || {};
  const feature: string[] = [];

  noopener && feature.push("noopener=yes");
  noreferrer && feature.push("noferrer=yes");

  window.open(url, target, feature.join(","));
};

/**
 * @description: base64 to blob
 */
export function dataURLtoBlob(base64Buf: string): Blob {
  const arr = base64Buf.split(",");
  const typeItem = arr[0];
  const mime = typeItem.match(/:(.*?);/)![1];
  const bstr = window.atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime });
}

/**
 * img to base64 encode
 * @param url
 * @param mineType
 * @returns
 */
export const urlToBase64 = (
  url: string,
  mineType?: string
): Promise<string> => {
  return new Promise((resolve, reject) => {
    let canvas = document.createElement(
      "CANVAS"
    ) as Nullable<HTMLCanvasElement>;
    const ctx = canvas!.getContext("2d");

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = function () {
      if (!canvas || !ctx) {
        return reject();
      }
      canvas.height = img.height;
      canvas.width = img.width;
      ctx.drawImage(img, 0, 0);
      const dataURL = canvas.toDataURL(mineType || "image/png");
      canvas = null;
      resolve(dataURL);
    };
    img.src = url;
  });
};

/**
 * Download online pictures
 * @param url
 * @param filename
 * @param mime
 * @param bom
 */
export function downloadByOnlineUrl(
  url: string,
  filename: string,
  mime?: string,
  bom?: BlobPart
) {
  urlToBase64(url).then((base64) => {
    downloadByBase64(base64, filename, mime, bom);
  });
}

/**
 * Download pictures based on base64
 * @param buf
 * @param filename
 * @param mime
 * @param bom
 */
export function downloadByBase64(
  buf: string,
  filename: string,
  mime?: string,
  bom?: BlobPart
) {
  const base64Buf = dataURLtoBlob(buf);
  downloadByData(base64Buf, filename, mime, bom);
}