import { fileURLToPath, URL } from "node:url";

import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import { viteSingleFile } from "vite-plugin-singlefile";
import svgLoader from "vite-svg-loader";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import type { UserConfig, ConfigEnv } from "vite";
// import { wrapperEnv } from "@/utils";
import copyFiles from "vite-plugin-copy-files";
import { viteStaticCopy } from "vite-plugin-static-copy";

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }: ConfigEnv): UserConfig => {
  const root = process.cwd();

  const env = loadEnv(mode, root);

  // const viteEnv = wrapperEnv(env);
  // const { VITE_PORT } = viteEnv;

  return {
    base: "/",
    server: {
      host: "0.0.0.0",
      port: Number(env.VITE_PORT),
      proxy: {
        // 字符串简写写法
        "/foo": "http://localhost:4567",
        // 选项写法
        "/api": {
          target: "http://jsonplaceholder.typicode.com",
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
        // 正则表达式写法
        "^/fallback/.*": {
          target: "http://jsonplaceholder.typicode.com",
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/fallback/, ""),
        },
        // 使用 proxy 实例
        "/apio": {
          target: "http://jsonplaceholder.typicode.com",
          changeOrigin: true,
          configure: (proxy, options) => {
            // proxy 是 'http-proxy' 的实例
          },
        },
      },
    },
    plugins: [
      vue(),
      vueJsx(),
      viteSingleFile({ removeViteModuleLoader: true }),
      svgLoader(),
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
      viteStaticCopy({
        targets: [
          {
            src: "build/config.js",
            dest: "",
          },
        ],
      }),
    ],
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
    build: {
      terserOptions: {
        compress: {
          drop_console: true,
        },
      },
    },
  };
});
