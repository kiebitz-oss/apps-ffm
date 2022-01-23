// @ts-check

/**
 * @type {import('@jest/types').Config.InitialOptions}
 */
const config = {
  displayName: "app-user",
  testURL: "http://localhost:3000/",
  testEnvironment: "<rootDir>/src/tests/test-environment.mjs",
  setupFilesAfterEnv: [
    "@testing-library/jest-dom/extend-expect",
    "jest-axe/extend-expect",
  ],
  modulePaths: ["<rootDir>/src/"],
  transform: {
    // Use babel-jest to transpile tests with the next/babel preset
    // https://jestjs.io/docs/configuration#transform-objectstring-pathtotransformer--pathtotransformer-object
    "^.+\\.(js|jsx|ts|tsx)$": [
      "babel-jest",
      {
        presets: ["next/babel"],
        plugins: ["macros"],
      },
    ],
    "^.+.(css||png|jpe?g|woff2?|svg)$": "jest-transform-stub",
    ".mdx?$": "jest-transformer-mdx",
  },
  moduleNameMapper: {
    "^@impfen/common$": "<rootDir>/../../packages/common/src/index.ts",
    "^@impfen/common/(.*)$": "<rootDir>/../../packages/common/src/$1",
    "^vanellus": "<rootDir>/../../packages/vanellus/src/index.ts",
    "^vanellus/(.*)$": "<rootDir>/../../packages/vanellus/src/$1",
  },
  testPathIgnorePatterns: ["<rootDir>/src/tests/e2e/"],
  collectCoverageFrom: ["src/**/*.{js,jsx,ts,tsx}"],
};

export default config;
