## pinia 使用

https://blog.csdn.net/m0_62883662/article/details/128589677

## docker 使用

`docker exec -it container-id bash`

`docker build -t my-new-start .`

`docker pull node:16`

## Babel 流程

源代码 --> 编译器 parse --> 抽象语法树 AST --> 转换过程 transform --> 修改后的 AST --> 生成器 generator --> 转换后的代码
@vue/babel-plugin-jsx vue 给 Babel 的插件 编译 v-show 等指令
@babel/core 做核心转换的库
@babel/plugin-transform-typescript 转换 ts 的库
@babel/plugin-syntax-import-meta 编译 import 等语法
@types/babel\_\_core

## vite plugin

pnpm i @types/svgo svgo cors debug etag fs-extra svg-baker pathe @types/cors @types/debug @types/etag @types/fs-extra --save-dev

## stylelint 引入插件

pnpm i @erhang/stylelint-config --save-dev

extends: ['@erhang/stylelint-config']
