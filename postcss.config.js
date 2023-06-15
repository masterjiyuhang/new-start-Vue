module.exports = {
  plugins: {
    "postcss-nested": {},
    "tailwindcss/nesting": "postcss-nesting",
    tailwindcss: {},
    autoprefixer: {},

    "postcss-pxtorem": {
      rootValue: 16, // 设计稿宽度的1/10
      propList: ["*"], // 需要做转化处理的属性，如`hight`、`width`、`margin`等，`*`表示全部
    },
  },
};
