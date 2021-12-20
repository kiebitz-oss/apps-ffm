const path = require("path");
// @ts-check

/**
 * @type {import('@storybook/react/types').StorybookConfig}
 **/
const config = {
  stories: [
    {
      directory: "../apps/user/src",
      titlePrefix: "User",
      files: "**/*.stories.*",
    },
    {
      directory: "../apps/mediator/src",
      titlePrefix: "Mediator",
      files: "**/*.stories.*",
    },
    {
      directory: "../apps/Provider/src",
      titlePrefix: "Provider",
      files: "**/*.stories.*",
    },
    {
      directory: "../packages/ui/src",
      titlePrefix: "UI",
      files: "**/*.stories.*",
    },
  ],
  logLevel: "info",
  staticDirs: ["../public"],
  framework: "@storybook/react",
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    {
      name: "@storybook/addon-postcss",
      options: {
        postcssLoaderOptions: {
          implementation: require("postcss"),
        },
      },
    },
    "@storybook/addon-a11y",
    "storybook-addon-next-router",
  ],
  core: {
    builder: "webpack5",
  },
  webpackFinal: async (config) => {
    config.resolve.modules = [
      path.resolve("node_modules"),
      path.resolve(process.cwd(), "src"),
      ...(config?.resolve?.modules || []),
    ];

    return config;
  },
};

module.exports = config;
