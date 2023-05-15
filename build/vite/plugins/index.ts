import vuePlugin from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import { viteSingleFile } from "vite-plugin-singlefile";
import svgLoader from "vite-svg-loader";
import AutoImport from "unplugin-auto-import/vite";
import ElementPlus from "unplugin-element-plus/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
// import { viteStaticCopy } from "vite-plugin-static-copy";
import Inspect from "vite-plugin-inspect";
import { viteMockServe } from "vite-plugin-mock";

import { viteBuildInfo } from "./viteBuildInfo";
import { GvaPositionServer } from "./viteCodeServer";
import { GvaPosition } from "./viteGvaPosition";
import VueI18nPlugin from "@intlify/unplugin-vue-i18n/vite";
import { cdn } from "./cdnPlugin";

export function setupVitePlugins({ command, isBuild, VITE_CDN }) {
  return [
    viteBuildInfo(),
    GvaPositionServer(),
    GvaPosition(),
    vuePlugin(),
    vueJsx(),
    VITE_CDN ? cdn : null,
    viteMockServe({
      mockPath: "mock",
      localEnabled: command === "serve",
      prodEnabled: isBuild,
    }),
    viteSingleFile({ removeViteModuleLoader: true }),
    svgLoader(),
    VueI18nPlugin({
      // include: [path.resolve(__dirname, '../../../src/locales/lang/**/*.ts')],
    }),
    AutoImport({
      imports: ["vue"],
      dts: "auto-import.d.ts", // 生成的类型文件
      resolvers: [
        ElementPlusResolver({
          importStyle: "sass",
        }),
      ],
    }),

    Components({
      resolvers: [ElementPlusResolver({ importStyle: "sass" })],
    }),

    ElementPlus({
      useSource: true,
    }),
    // viteStaticCopy({
    //   targets: [
    //     {
    //       src: "build/config.js",
    //       dest: "",
    //     },
    //   ],
    // }),
    Inspect(),
  ];
}
