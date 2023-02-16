## 错误记录

### chalk报错
 - `error when starting dev server:
Error [ERR_REQUIRE_ESM]: require() of ES Module xxxx\node_modules\.pnpm\chalk@5.2.0\node_modules\chalk\source\index.js from xxxx\vite.config.ts not supported.`
    - 这个可能node版本的问题 降级node版本到14或者将chalk降级到4.1.2 