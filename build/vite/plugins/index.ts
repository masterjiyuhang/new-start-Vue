import { ConfigEnv } from "vite";

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

export function setupVitePlugins({ command }: ConfigEnv) {
  return [
    viteBuildInfo(),
    GvaPositionServer(),
    GvaPosition(),
    vuePlugin(),
    vueJsx(),
    viteMockServe({
      mockPath: "mock",
      localEnabled: command === "serve",
    }),
    viteSingleFile({ removeViteModuleLoader: true }),
    svgLoader(),
    AutoImport({
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
