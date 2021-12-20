module.exports = {
  plugins: ["cypress"],
  extends: ["prettier"],
  env: {
    mocha: true,
    "cypress/globals": true,
  },
  rules: {
    strict: "off",
  },
};
