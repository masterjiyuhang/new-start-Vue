import { fileURLToPath, URL } from "url";
import path from "path";
import { defineConfig, loadEnv } from "vite";
import type { UserConfig, ConfigEnv } from "vite";
import { setupVitePlugins } from "./build/vite/plugins";

// https://vitejs.dev/config/
export default defineConfig(({ mode, command }: ConfigEnv): UserConfig => {
  const root = process.cwd();
  const isBuild = command === "build";
  const { VITE_PORT, VITE_CDN, VITE_BUILD_COMPRESS, VITE_BASE_URL } = loadEnv(
    mode,
    root,
  );
  // console.log(loadEnv(mode, root), process.env);

  const isVercel = mode === "vercel";
  const BaseUrl = isVercel ? "/" : VITE_BASE_URL || "";
  // vite 插件
  const plugins = setupVitePlugins({
    isBuild,
    VITE_CDN,
    compress: VITE_BUILD_COMPRESS,
  });

  const esbuild = {};
  const optimizeDeps = {};

  return {
    base: BaseUrl,

    define: {
      "process.env": {},
    },
    server: {
      host: "0.0.0.0",
      port: Number(VITE_PORT),
      proxy: {
        // 字符串简写写法
        "/foo": "http://localhost:4567",
        // 选项写法
        "/api": {
          target: "http://jsonplaceholder.typicode.com",
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
        "/basic-api/car-base": {
          target: "http://localhost:3000",
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/basic-api\/car-base/, ""),
        },

        // 正则表达式写法
        "^/fallback/.*": {
          target: "http://jsonplaceholder.typicode.com",
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/fallback/, ""),
        },
        "^/basic-api/ten-api/.*": {
          target: "https://tenapi.cn",
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/basic-api\/ten-api/, ""),
        },
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          // additionalData: `@import "~/style/element/index.scss"; @import "~/style/scss/mixins/mixin.scss";  @import "~/style/common/globals.scss";  @import "~/style/var.scss";`,
          additionalData: `@use "~/style/element/index.scss" as *; @use "~/style/scss/mixins/mixin.scss" as cch; @use "~/style/var.scss" as cch-variables;`,
          // additionalData: `@use "~/style/element/index.scss" as *; @use "~/style/scss/mixins/mixin.scss" as *; @use "~/style/common/globals.scss" as *;  @use "~/style/var.scss" as *;`,
          // additionalData: `@use "~/style/element/index.scss" as *; @import "~/style/scss/mixins/mixin.scss"; @import "~/style/common/globals.scss";  @import "~/style/var.scss";`,
        },
      },
    },
    plugins,
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
