import { onMounted } from "vue";

export const useGenBase64 = () => {
  interface Options {
    el: string;
  }
  function generateBase64(options: Options): Promise<{ baseUrl: string }> {
    return new Promise((resolve) => {
      onMounted(() => {
        const img: HTMLImageElement = document.querySelector(
          options.el
        ) as HTMLImageElement;

        img.onload = () => {
          resolve({
            baseUrl: base64(img),
          });
        };
      });
    });
  }

  const base64 = (image: HTMLImageElement) => {
    const canvas = document.createElement("canvas");
    canvas.width = image.width;
    canvas.height = image.height;

    const ctx = canvas.getContext("2d");
    ctx?.drawImage(image, 0, 0, canvas.width, canvas.height);
    return canvas.toDataURL("image/png");
  };

  return {
    generateBase64,
  };
};
