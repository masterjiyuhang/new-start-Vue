module.exports = {
  plugins: {
    "postcss-nested": {},
    "tailwindcss/nesting": "postcss-nesting",
    tailwindcss: {},
    autoprefixer: {
      overrideBrowserslist: [
        "Android 4.1",
        "iOS 7.1",
        "Chrome > 31",
        "ff > 31",
        "ie >= 8",
      ],
    },

    // "postcss-pxtorem": {
    //   // rootValue: 1, // 设计稿宽度的1/10
    //   // propList: ["*"], // 需要做转化处理的属性，如`hight`、`width`、`margin`等，`*`表示全部
    //   // rootValue: 192, //设计图宽度/10
    //   // unitPrecision: 5, //允许REM单位增长到的十进制数字。
    //   // //propWhiteList: [],  //默认值是一个空数组，这意味着禁用白名单并启用所有属性。
    //   // // propBlackList: [], //黑名单
    //   // exclude: false, //默认false，可以（reg）利用正则表达式排除某些文件夹的方法，例如/(node_module)/ 。如果想把前端UI框架内的px也转换成rem，请把此属性设为默认值
    //   // selectorBlackList: [], //要忽略并保留为px的选择器
    //   // ignoreIdentifier: false, //（boolean/string）忽略单个属性的方法，启用ignoreidentifier后，replace将自动设置为true。
    //   // replace: true, // （布尔值）替换包含REM的规则，而不是添加回退。
    //   // mediaQuery: false, //（布尔值）允许在媒体查询中转换px。
    //   // minPixelValue: 0, //设置要替换的最小像素值(3px会被转rem)。 默认 0
    // },
  },
};
