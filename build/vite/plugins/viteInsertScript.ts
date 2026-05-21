import { Plugin } from "vite";

export const insertScriptPlugin = (): Plugin => {
  return {
    name: "insert-script",
    transformIndexHtml(_html) {
      void process.env.NODE_ENV;
      // if (!isProduction) {
      //   const scriptPath = `https://cdn.erhang.fun/track.js`;
      //   return html.replace(
      //     "</head>",
      //     `<script src="${scriptPath}" defer></script></head>`,
      //   );
      // }
    },
  };
};
