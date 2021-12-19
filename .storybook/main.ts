import type { StorybookConfig } from "@storybook/react/types";
import path from "path";

const config: StorybookConfig = {
  stories: [
    "../apps/user/src/**/*.stories.@(mdx|ts|tsx)",
    "../apps/mediator/src/**/*.stories.@(mdx|ts|tsx)",
    "../apps/provider/src/**/*.stories.@(mdx|ts|tsx)",
    "../packages/common/src/**/*.stories.@(mdx|ts|tsx)",
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
  ],
  core: {
    builder: "webpack5",
  },
  features: {
    postcss: false,
    modernInlineRender: true,
    storyStoreV7: !global.navigator?.userAgent?.match?.("jsdom"),
    buildStoriesJson: true,
    babelModeV7: true,
  },
  reactOptions: {
    fastRefresh: true,
  },
  webpackFinal: async (config) => {
    config.resolve!.modules = [
      path.resolve("node_modules"),
      path.resolve(process.cwd(), "src"),
      ...(config?.resolve?.modules || []),
    ];

    return config;
  },
};

export default config;
