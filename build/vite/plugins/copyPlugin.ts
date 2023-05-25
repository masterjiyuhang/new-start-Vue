import { viteStaticCopy } from "vite-plugin-static-copy";

export const configCopyPlugin = ({ url }: { url?: string }) => {
  return viteStaticCopy({
    targets: [
      {
        src: url ?? "build/config.js",
        dest: "",
      },
    ],
  });
};
