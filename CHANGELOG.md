## mock 使用

```bash
pnpm install -D vite-plugin-mock

# vite config中设置
import { viteMockServe } from "vite-plugin-mock";
return [
    ...,
    viteMockServe({
        mockPath: "mock",
        localEnabled: true,
      }),
    ]

# 根目录下新建一个mock文件夹
import { MockMethod } from "vite-plugin-mock";
export default [
  {
    url: "/basic-api/system/getAccountList",
    timeout: 100,
    method: "get",
    response: ({ query }) => {
      const { page = 1, pageSize = 20 } = query;
      return resultPageSuccess(page, pageSize, data ={});
    },
  },
] as MockMethod[];
```

## vite 插件

## layout

## 安装 tailwind

```bash
pnpm install -D tailwindcss@latest postcss@latest autoprefixer@latest

npx tailwindcss init -p
```

## tabs init
初始化页面上面的tabs