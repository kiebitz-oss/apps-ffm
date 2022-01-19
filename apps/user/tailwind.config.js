const config = require("../../tailwind.config.js");

module.exports = {
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms")({
      strategy: "class",
    }),
  ],
  ...config,
};
