// @ts-check

/**
 * @type {import('@jest/types').Config.InitialOptions}
 */
const config = {
  displayName: "common",
  roots: ["<rootDir>"],
  testURL: "http://localhost:3000/",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: [
    "@testing-library/jest-dom/extend-expect",
    "jest-axe/extend-expect",
  ],
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
  },
  testPathIgnorePatterns: [
    "<rootDir>/node_modules/",
    "<rootDir>/.next/",
    "<rootDir>/dist/",
    "/tests\\/e2e/",
  ],
  collectCoverageFrom: ["src/**/*.{js,jsx,ts,tsx}"],
};

export default config;
