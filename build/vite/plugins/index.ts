import vuePlugin from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import svgLoader from "vite-svg-loader";
import Inspect from "vite-plugin-inspect";
import VueI18nPlugin from "@intlify/unplugin-vue-i18n/vite";
import DefineOptions from 'unplugin-vue-define-options/vite'

import { viteBuildInfo } from "./viteBuildInfo";
import { GvaPositionServer } from "./viteCodeServer";
import { GvaPosition } from "./viteGvaPosition";
import { configCdnPlugin } from "./cdnPlugin";
import { configMockPlugin } from "./mockPlugin";
import { configSingleFile } from "./singleFilePlugin";
import { configCopyPlugin } from "./copyPlugin";
import { configComponentPlugin } from "./componentPlugin";
import { configCompressPlugin } from "./compressPlugin";

export function setupVitePlugins({ isBuild, VITE_CDN, compress }) {
  return [
    DefineOptions(),
    viteBuildInfo(),
    GvaPositionServer(),
    GvaPosition(),
    vuePlugin(),
    vueJsx(),
    VITE_CDN ? configCdnPlugin() : null,
    configMockPlugin({ isBuild }),
    configSingleFile(),
    svgLoader(),
    VueI18nPlugin({
      // include: [path.resolve(__dirname, '../../../src/locales/lang/**/*.ts')],
    }),
    configCopyPlugin({ url: "build/config.js" }),
    Inspect(),
    ...configComponentPlugin(),
    isBuild ? configCompressPlugin(compress) : null,
  ];
}
