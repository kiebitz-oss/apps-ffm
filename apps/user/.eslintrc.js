const twConfig = require("./tailwind.config");

/**
 * @type {import('@typescript-eslint/experimental-utils').TSESLint.Linter.Config}
 */
const config = {
  root: true,
  extends: [
    "next/core-web-vitals",
    "plugin:regexp/recommended",
    "plugin:tailwindcss/recommended",
    "plugin:prettier/recommended",
  ],
  settings: {
    next: {
      rootDir: __dirname,
    },
    tailwindcss: {
      config: twConfig,
    },
  },
  plugins: ["playwright", "jest", "testing-library"],
  rules: {
    "tailwindcss/no-custom-classname": "off",
    "react/no-unescaped-entities": "off",
    "@next/next/no-img-element": "off",
  },
  ignorePatterns: ["node_modules", "dist", ".next", "src/locales/**/*.ts"],
  overrides: [
    {
      files: ["**/?(*.)+(test).{ts,tsx}"],
      extends: ["plugin:jest/all", "plugin:testing-library/react"],
      rules: {
        "@typescript-eslint/no-non-null-assertion": "off",
        "@typescript-eslint/no-object-literal-type-assertion": "off",
        "@typescript-eslint/no-empty-function": "off",
      },
    },
    {
      files: ["**/?(*.)+(spec).{ts,tsx}"],
      extends: ["plugin:playwright/playwright-test"],
      rules: {
        "@typescript-eslint/no-non-null-assertion": "off",
        "@typescript-eslint/no-object-literal-type-assertion": "off",
        "@typescript-eslint/no-empty-function": "off",
      },
    },
    {
      files: ["*.js"],
      parser: "espree",
      parserOptions: {
        ecmaVersion: 2020,
      },
      rules: {
        "@typescript-eslint/naming-convention": "off",
        "@typescript-eslint/ban-ts-comment": "off",
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/no-var-requires": "off",
        "@typescript-eslint/explicit-module-boundary-types": "off",
        "@typescript-eslint/consistent-type-exports": "off",
        "@typescript-eslint/consistent-type-imports": "off",
      },
    },
  ],
};

module.exports = config;
