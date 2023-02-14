import { fileURLToPath, URL } from "url";
import path from "path";
import { defineConfig, loadEnv } from "vite";
import type { UserConfig, ConfigEnv } from "vite";
import { setupVitePlugins } from "./build/vite/plugins";

// https://vitejs.dev/config/
export default defineConfig(({ mode }: ConfigEnv): UserConfig => {
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
        // // 使用 proxy 实例
        // "/apio": {
        //   target: "http://jsonplaceholder.typicode.com",
        //   changeOrigin: true,
        //   configure: (proxy, options) => {
        //     // proxy 是 'http-proxy' 的实例
        //   },
        // },
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "~/style/element/index.scss" as *;`,
        },
      },
    },
    plugins: setupVitePlugins(),
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
        "~/": `${path.resolve(__dirname, "src")}/`,
        "vue-i18n": "vue-i18n/dist/vue-i18n.cjs.js",
      },
    },

    build: {
      terserOptions: {
        compress: {
          drop_console: true,
        },
      },
      minify: "terser",
    },
  };
});
