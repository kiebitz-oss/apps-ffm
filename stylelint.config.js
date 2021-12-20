// @ts-check

/**
 * @type {import('stylelint').Config}
 **/
const config = {
  plugins: ["stylelint-no-unsupported-browser-features"],
  extends: ["stylelint-config-recommended", "stylelint-a11y/recommended"],
  rules: {
    "plugin/no-unsupported-browser-features": [
      true,
      {
        severity: "warning",
      },
    ],
    "at-rule-no-unknown": [
      true,
      {
        ignoreAtRules: [
          "tailwind",
          "layer",
          "variants",
          "responsive",
          "screen",
        ],
      },
    ],
    "block-no-empty": null,
    "selector-pseudo-class-no-unknown": [
      true,
      {
        ignorePseudoClasses: "global",
      },
    ],
  },
};

module.exports = config;
