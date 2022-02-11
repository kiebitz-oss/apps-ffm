module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "plugin:regexp/recommended",
    "plugin:promise/recommended",
    "prettier",
  ],
  plugins: [
    "jest",
    "testing-library",
    "regexp",
    "promise",
    "compat",
    "svelte3",
    "@typescript-eslint",
  ],
  settings: {
    "svelte3/typescript": () => require("typescript"),
    polyfills: [],
  },
  globals: {
    svelte: "readonly",
  },
  parserOptions: {
    sourceType: "module",
    ecmaVersion: 2019,
    // tsconfigRootDir: __dirname,
    // project: ["./tsconfig.json"],
    extraFileExtensions: [".svelte"],
  },
  env: {
    browser: true,
    es2017: true,
    jest: true,
  },
  rules: {
    "compat/compat": "error",
  },
  overrides: [
    {
      files: ["**/?(*.)+(test).{ts,tsx}"],
      extends: ["plugin:jest/all", "plugin:testing-library/react"],
    },
    {
      files: ["*.svelte"],
      processor: "svelte3/svelte3",
    },
    // {
    //   files: ["*.js"],
    //   parser: "espree",
    //   parserOptions: {
    //     ecmaVersion: 2017,
    //   },
    // },
  ],
  ignorePatterns: ["dist"],
};
