import { Plugin } from "vite";

export const insertScriptPlugin = (): Plugin => {
  return {
    name: "insert-script",
    transformIndexHtml(html) {
      const isProduction = process.env.NODE_ENV === "production";
      if (!isProduction) {
        const scriptPath = `https://cdn.cchang.fun/track.js`;
        return html.replace(
          "</head>",
          `<script src="${scriptPath}" defer></script></head>`
        );
      }
    },
  };
};
