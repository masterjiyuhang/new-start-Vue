module.exports = {
  root: true,
  extends: ["@erhang", "./src/types/.eslintrc-auto-import.json"],
  globals: {
    window: true,
    NodeJS: true,
  },
  rules: {
    "no-undef": "off",
  },
};
