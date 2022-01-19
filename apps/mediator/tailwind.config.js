const config = require("../../packages/common/tailwind.config.cjs");

module.exports = Object.assign({}, config, {
  content: [
    "../../packages/common/src/ui/**/*.tsx",
    "./src/**/*.tsx",
    "./src/**/*.mdx",
  ],
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms")({
      strategy: "class",
    }),
  ],
});
