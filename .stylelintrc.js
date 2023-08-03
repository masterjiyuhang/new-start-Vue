module.exports = {
  plugins: ["stylelint-order", "stylelint-prettier", "stylelint-scss"],
  extends: [
    "stylelint-config-standard", // 配置stylelint拓展插件
    "stylelint-config-standard-scss", // 配置stylelint scss插件
    "stylelint-config-recommended",
    "stylelint-config-recommended-scss",
    "stylelint-config-recommended-vue/scss", // 配置 vue 中 scss 样式格式化
    "stylelint-config-recess-order", // 配置stylelint css属性书写顺序插件,
    "stylelint-config-prettier", // 配置stylelint和prettier兼容
    "stylelint-config-property-sort-order-smacss",
  ],
  overrides: [
    {
      files: ["**/*.(scss|css|vue|html)"],
      customSyntax: "postcss-scss",
    },
    {
      files: ["**/*.(html|vue)"],
      customSyntax: "postcss-html",
    },
    {
      files: ["*.scss", "**/*.scss"],
      customSyntax: "postcss-scss",
      extends: [
        "stylelint-config-standard-scss",
        "stylelint-config-recommended",
        "stylelint-config-recommended-scss",
        "stylelint-config-recommended-vue/scss",
      ],
      rule: {
        "scss/percent-placeholder-pattern": null,
      },
    },
  ],
  ignoreFiles: [
    "**/*.js",
    "**/*.jsx",
    "**/*.tsx",
    "**/*.ts",
    "**/*.json",
    "**/*.md",
    "**/*.yaml",
  ],
  rules: {
    "value-keyword-case": null, // 在css中使用v-bind，不报错
    "no-descending-specificity": null, // 禁止在具有较高优先级的选择器后出现被其覆盖
    "function-url-quotes": "always", // 要求或禁止URL的引号" always（必须加上引号）
    "no-empty-source": null, // 关闭禁止空源码
    "selector-class-pattern": null, // 关闭强制选择器类名的格式
    "property-no-unknown": null, // 禁止未知的属性（true为不允许）
    // "block-opening-brace-space-before": "always", // 大括号之前必须有一个空格
    "value-no-vendor-prefix": null, // 关闭 属性值前缀 --webkit-box
    "property-no-vendor-prefix": null, // 关闭 属性前缀 -webkit-mask
    "selector-pseudo-class-no-unknown": [
      // 不允许未知的选择器
      true,
      {
        ignorePseudoClasses: ["global", "v-deep", "deep"], // 忽略属性，修改
      },
    ],

    "scss/operator-no-newline-after": null, // 关闭 禁止在 Sass 运算符之后换行
    "scss/operator-no-newline-before": null,

    "scss/no-global-function-names": null, // 关闭 禁止使用全局函数名称
    "scss/at-function-pattern": null, // 关闭 指定类似 Sass/SCSS 的 mixin 名称的模式
    "scss/at-mixin-pattern": null,
    "scss/operator-no-unspaced": null,
    "scss/at-extend-no-missing-placeholder": null,
    "scss/dollar-variable-pattern": null, //
  },
  ignoreFiles: ["**/*.js", "**/*.jsx", "**/*.tsx", "**/*.ts"],
};
