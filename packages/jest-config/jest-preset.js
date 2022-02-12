/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
const config = {
  testEnvironment: "jsdom",
  testMatch: ["<rootDir>/**/*.test.*"],
  rootDir: "src",
  transform: {
    "^.+\\.js$": "ts-jest",
    "^.+\\.ts$": "ts-jest",
    "^.+\\.svelte$": [
      "svelte-jester",
      {
        preprocess: true,
      },
    ],
  },
  moduleNameMapper: {
    "^\\$lib(.*)$": "<rootDir>/lib$1",
    "^\\$app(.*)$": [
      "<rootDir>/../.svelte-kit/dev/runtime/app$1",
      "<rootDir>/../.svelte-kit/build/runtime/app$1",
    ],
  },
  extensionsToTreatAsEsm: [".ts", ".svelte"],
  moduleFileExtensions: ["js", "ts", "json", "node", "svelte"],
  setupFilesAfterEnv: ["@testing-library/jest-dom/extend-expect"],
};

module.exports = config;
