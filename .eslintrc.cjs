module.exports = {
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  parser: "vue-eslint-parser",
  // 指定解析器选项
  parserOptions: {
    parser: "@typescript-eslint/parser",
    ecmaVersion: 2020,
    sourceType: "module",
    jsxPragma: "React",
    ecmaFeatures: {
      jsx: true,
    },
    createDefaultProgram: false,
    extraFileExtensions: [".vue"],
  },
  // 配置插件（可选）
  plugins: ["vue", "@typescript-eslint"],
  // 可以扩展现有的配置规则（可选）
  extends: [
    "plugin:vue/vue3-essential",
    "plugin:vue/vue3-recommended",
    "eslint:recommended",
    // "plugin:import/recommended",
    "plugin:prettier/recommended",
    "plugin:@typescript-eslint/recommended",
    "./src/types/.eslintrc-auto-import.json",
    "@erhang",
  ],
  // 配置规则
  rules: {
    "no-var": "error",
    "no-case-declarations": "off",
    "no-use-before-define": "off",
    "space-before-function-paren": "off",
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_",
      },
    ],
    "@typescript-eslint/ban-ts-ignore": "off",
    "@typescript-eslint/ban-ts-comment": "off",
    "@typescript-eslint/ban-types": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-var-requires": "off",
    "@typescript-eslint/no-empty-function": "off",
    "@typescript-eslint/no-use-before-define": "off",
    "@typescript-eslint/no-non-null-assertion": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "vue/script-setup-uses-vars": "error",
    "vue/no-reserved-component-names": "off",
    "vue/custom-event-name-casing": "off",
    "vue/attributes-order": "off",
    "vue/one-component-per-file": "off",
    "vue/html-closing-bracket-newline": "off",
    "vue/max-attributes-per-line": "off",
    "vue/multiline-html-element-content-newline": "off",
    "vue/singleline-html-element-content-newline": "off",
    "vue/attribute-hyphenation": "off",
    "vue/require-default-prop": "off",
    "vue/require-explicit-emits": "off",
    "vue/html-self-closing": [
      "error",
      {
        html: {
          void: "always",
          normal: "never",
          component: "always",
        },
        svg: "always",
        math: "always",
      },
    ],
    "vue/multi-word-component-names": "off",
  },
  // 配置全局变量（可选）
  globals: { defineOptions: "readonly" },
};

// module.exports = {
//   extends: ["@erhang"],
// };
