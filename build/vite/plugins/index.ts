import vuePlugin from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import { viteSingleFile } from "vite-plugin-singlefile";
import svgLoader from "vite-svg-loader";
import AutoImport from "unplugin-auto-import/vite";
import ElementPlus from "unplugin-element-plus/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import { viteStaticCopy } from "vite-plugin-static-copy";
import Inspect from "vite-plugin-inspect";
import { viteBuildInfo } from "./viteBuildInfo";
import { GvaPositionServer } from "./viteCodeServer";
import { GvaPosition } from "./viteGvaPosition";

export function setupVitePlugins() {
  return [
    viteBuildInfo(),
    GvaPositionServer(),
    GvaPosition(),
    vuePlugin(),
    vueJsx(),
    viteSingleFile({ removeViteModuleLoader: true }),
    svgLoader(),
    AutoImport({
      resolvers: [
        ElementPlusResolver({
          importStyle: "sass",
        }),
      ],
    }),
    ElementPlus(),
    Components({
      resolvers: [ElementPlusResolver({ importStyle: "sass" })],
    }),
    viteStaticCopy({
      targets: [
        {
          src: "build/config.js",
          dest: "",
        },
      ],
    }),
    Inspect(),
  ];
}
