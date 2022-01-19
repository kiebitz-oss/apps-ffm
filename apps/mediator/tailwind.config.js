const config = require("../../tailwind.config.js");

module.exports = {
  ...config,
  content: ["./src/**/*.tsx", "./src/**/*.mdx"],
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms")({
      strategy: "class",
    }),
  ],
};
