module.exports = {
  extends: "@impfen/eslint-config",
  parserOptions: {
    project: "./tsconfig.json",
    tsconfigRootDir: __dirname,
    sourceType: "module",
    ecmaVersion: 2019,
    extraFileExtensions: [".svelte"],
  },
  settings: {
    "svelte3/typescript": () => require("typescript"),
  },
};
