import type { LinguiConfig } from "@lingui/conf";

const config: Partial<LinguiConfig> = {
  locales: ["de", "en"],
  format: "po",
  catalogs: [
    {
      path: "<rootDir>/apps/user/src/locales/{locale}/messages",
      include: ["<rootDir>/apps/user/src/**"],
      exclude: ["**/node_modules/**"],
    },
    {
      path: "<rootDir>/apps/provider/src/locales/{locale}/messages",
      include: ["<rootDir>/apps/provider/src/**"],
      exclude: ["**/node_modules/**"],
    },
    {
      path: "<rootDir>/apps/mediator/src/locales/{locale}/messages",
      include: ["<rootDir>/apps/mediator/src/**"],
      exclude: ["**/node_modules/**"],
    },
    {
      path: "<rootDir>/packages/common/src/locales/{locale}/messages",
      include: ["<rootDir>/packages/common/src/**"],
      exclude: ["**/node_modules/**"],
    },
  ],
  extractBabelOptions: {
    rootMode: "upward",
  },
  formatOptions: { origins: false, lineNumbers: false },
  orderBy: "messageId",
  compileNamespace: "ts",
};

export default config;
