## pinia 使用

https://blog.csdn.net/m0_62883662/article/details/128589677


## docker 使用


`docker exec -it container-id bash` 

`docker build -t my-new-start .`

`docker pull node:16`

## Babel 流程

源代码 --> 编译器parse --> 抽象语法树AST --> 转换过程transform --> 修改后的AST --> 生成器generator --> 转换后的代码
@vue/babel-plugin-jsx   vue给Babel的插件 编译v-show等指令
@babel/core 做核心转换的库
@babel/plugin-transform-typescript 转换ts的库
@babel/plugin-syntax-import-meta 编译import等语法
@types/babel__core


## vite plugin
pnpm i @types/svgo svgo cors debug etag fs-extra svg-baker pathe @types/cors @types/debug @types/etag @types/fs-extra --save-dev