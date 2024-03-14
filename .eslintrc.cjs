module.exports = {
  root: true,
  extends: [
    "@erhang/eslint-config-basic",
    "./src/types/.eslintrc-auto-import.json",
  ],
  globals: {
    window: true,
    NodeJS: true,
  },
  rules: {
    "no-undef": "off",
  },
};
