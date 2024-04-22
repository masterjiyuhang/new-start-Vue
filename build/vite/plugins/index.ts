import vuePlugin from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import svgLoader from "vite-svg-loader";
import Inspect from "vite-plugin-inspect";
import VueI18nPlugin from "@intlify/unplugin-vue-i18n/vite";

import { viteBuildInfo } from "./viteBuildInfo";
import { GvaPositionServer } from "./viteCodeServer";
import { GvaPosition } from "./viteGvaPosition";
import { configMockPlugin } from "./mockPlugin";
// import { configSingleFile } from "./singleFilePlugin";
import { configComponentPlugin } from "./componentPlugin";
import { configCompressPlugin } from "./compressPlugin";

import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
import path from "path";
import { insertScriptPlugin } from "./viteInsertScript";

export function setupVitePlugins({ isBuild, VITE_CDN, compress }) {
  return [
    insertScriptPlugin(),
    // {
    //   name: "insert-script",
    //   transformIndexHtml(html) {
    //     console.log(html);
    //   },
    //   generateBundle(_, bundle) {
    //     console.log(process.env.NODE_ENV);
    //     const isProduction = process.env.NODE_ENV === "production";
    //     if (!isProduction) {
    //       const scriptPath = `https://cdn.cchang.fun/track.js`;

    //       // Inject script tag into index.html bundle
    //       const indexHtml = bundle["index.html"];
    //       if (indexHtml) {
    //         indexHtml.code = indexHtml.code.replace(
    //           "</head>",
    //           `<script src="${scriptPath}" defer></script></head>`
    //         );
    //       }
    //     }
    //   },
    // },
    viteBuildInfo(),
    GvaPositionServer(),
    GvaPosition(),
    vuePlugin(),
    vueJsx(),
    configMockPlugin({ isBuild }),
    // configSingleFile(),
    svgLoader(),
    VueI18nPlugin({}),

    createSvgIconsPlugin({
      // Specify the icon folder to be cached
      iconDirs: [path.resolve(process.cwd(), "src/assets/icons")],
      // Specify symbolId format
      symbolId: "icon-[dir]-[name]",

      /**
       * custom insert position
       * @default: body-last
       */
      inject: "body-last",

      /**
       * custom dom id
       * @default: __svg__icons__dom__
       */
      customDomId: "__svg__icons__dom__",
    }),
    Inspect(),
    ...configComponentPlugin(),
    isBuild ? configCompressPlugin({ compress }) : null,
  ];
}
