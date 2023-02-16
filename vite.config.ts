import { fileURLToPath, URL } from "url";
import path from "path";
import { defineConfig, loadEnv } from "vite";
import type { UserConfig, ConfigEnv } from "vite";
import { setupVitePlugins } from "./build/vite/plugins";

// https://vitejs.dev/config/
export default defineConfig(({ mode, command }: ConfigEnv): UserConfig => {
  const root = process.cwd();

  const env = loadEnv(mode, root);

  const esbuild = {};
  const optimizeDeps = {};
  return {
    base: "./",
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
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "~/style/element/index.scss" as *;`,
        },
      },
    },
    plugins: setupVitePlugins({ command, mode }),
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
        "~/": `${path.resolve(__dirname, "src")}/`,
        "vue-i18n": "vue-i18n/dist/vue-i18n.cjs.js",
      },
    },
    esbuild,
    optimizeDeps,
    build: {
      target: "es2017",
      terserOptions: {
        compress: {
          drop_console: true,
        },
      },
      minify: "terser",
      manifest: false, // 是否产出manifest.json
      sourcemap: false, // 是否产出sourcemap.json
    },
  };
});
