module.exports = {
  root: true,
  extends: ["@erhang/stylelint-config"],
  rules: {
    "at-rule-no-unknown": [
      true,
      {
        ignoreAtRules: [
          "tailwind",
          "apply",
          "variants",
          "responsive",
          "screen",
          "function",
          "if",
          "each",
          "include",
          "mixin",
          "extend",
          "return",
          "for",
          "forward",
          "else",
          "use",
        ],
      },
    ],
  },
};
