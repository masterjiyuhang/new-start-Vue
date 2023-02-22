## 错误记录

### chalk 报错

- `error when starting dev server:
Error [ERR_REQUIRE_ESM]: require() of ES Module xxxx\node_modules\.pnpm\chalk@5.2.0\node_modules\chalk\source\index.js from xxxx\vite.config.ts not supported.` - 这个可能 node 版本的问题 降级 node 版本到 14 或者将 chalk 降级到 4.1.2

### 自定义 sass 和 element 有冲突

- @use rules must be written before any other rules.
  这个玩意耗费了我一晚上加上一上午。
  sass 支持命名空间，最后我没招了。 把 viteConfig 里面的命名由全局 `@use 'xxx' as *;` 改成了 这种有自己名称的命名空间`@use 'xxx' as cch;`
  使用的时候需要加上命名空间，例如使用自定义的 bem 里面的 b，`@include cch.b() {}`。
  使用全局变量`cch-variables.$primary`·`
