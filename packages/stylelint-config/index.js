const config = {
  plugins: ["stylelint-no-unsupported-browser-features"],
  extends: ["stylelint-config-recommended"],
  // customSyntax: "postcss-html",
  // overrides: [
  //   {
  //     files: ["**/*.css"],
  //     customSyntax: "postcss-scss"
  //   }
  // ],
  rules: {
    "plugin/no-unsupported-browser-features": [
      true,
      {
        severity: "warning",
      },
    ],
    "block-no-empty": null,
    "selector-pseudo-class-no-unknown": [
      true,
      {
        ignorePseudoClasses: "global",
      },
    ],
    "no-descending-specificity": null,
  },
};

module.exports = config;
