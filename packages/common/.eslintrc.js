const twConfig = require("./tailwind.config");

/**
 * @type {import('@typescript-eslint/experimental-utils').TSESLint.Linter.Config}
 */
const config = {
  root: true,
  extends: [
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:tailwindcss/recommended",
    "plugin:regexp/recommended",
    "plugin:prettier/recommended",
  ],
  env: {
    browser: true,
    node: true,
  },
  settings: {
    react: {
      version: "detect",
    },
    tailwindcss: {
      config: twConfig,
    },
  },
  plugins: ["react", "jsx-a11y", "storybook", "jest", "testing-library"],
  rules: {
    "tailwindcss/no-custom-classname": "off",
    "react/no-unescaped-entities": "off",
    "react/react-in-jsx-scope": "off",
    "react/prop-types": "off",
    "jsx-a11y/alt-text": [
      "warn",
      {
        elements: ["img"],
        img: ["Image"],
      },
    ],
    "jsx-a11y/aria-props": "warn",
    "jsx-a11y/aria-proptypes": "warn",
    "jsx-a11y/aria-unsupported-elements": "warn",
    "jsx-a11y/role-has-required-aria-props": "warn",
    "jsx-a11y/role-supports-aria-props": "warn",
    "@typescript-eslint/no-empty-interface": "off",
    "@typescript-eslint/consistent-type-definitions": "off",
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
      globalReturn: false,
    },
    ecmaVersion: 2020,
    project: ["tsconfig.json"],
    sourceType: "module",
    allowImportExportEverywhere: true,
  },
  ignorePatterns: ["node_modules", "dist", ".next"],
  overrides: [
    {
      files: ["**/*.ts?(x)"],
      parser: "@typescript-eslint/parser",
      parserOptions: {
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
        warnOnUnsupportedTypeScriptVersion: true,
      },
    },
    {
      files: ["**/?(*.)+(test).{ts,tsx}"],
      extends: ["plugin:jest/all", "plugin:testing-library/react"],
      rules: {
        "@typescript-eslint/no-non-null-assertion": "off",
        "@typescript-eslint/no-object-literal-type-assertion": "off",
        "@typescript-eslint/no-empty-function": "off",
        "jest/no-commented-out-tests": "off",
      },
    },
    {
      files: ["**/*.stories.{ts,tsx,mdx}"],
      extends: ["plugin:storybook/recommended", "plugin:storybook/csf-strict"],
      rules: {
        "storybook/use-storybook-testing-library": "off",
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
