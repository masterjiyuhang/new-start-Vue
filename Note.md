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

初始化页面上面的 tabs

## upload

自定义 table 组件
20230408-0409 摸鱼两天

最近准备重新更新一套模板。
细化引入权限部分
Http 封装 支持缓存
Pinia Vue3 TypeScript
I18n Router

## 国庆来袭

重磅更新
一些常用 css 样式
计算机网络知识
浏览器相关知识
Typescript 入门到放弃
接入个人 node 后端
优化代码结构 删除无用代码

## Nest 后台接入

准备了完善的 nest 服务端
