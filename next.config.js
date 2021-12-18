const webpack = require("webpack");
const withMDX = require("@next/mdx")({
  extension: /\.mdx$/,
});

const defaultLocale = "de";
const locales = ["de", "en"];

const config = {
  reactStrictMode: true,
  swcMinify: false,

  pageExtensions: ["ts", "tsx", "md", "mdx"],

  i18n: {
    locales,
    defaultLocale,
  },

  webpack: (config) => {
    config.resolve.fallback = {
      buffer: require.resolve("buffer/"),
      process: require.resolve("process/browser"),
    };

    config.plugins.push(
      new webpack.IgnorePlugin({ resourceRegExp: /\/.stories.tsx\// })
    );

    config.module.rules.push({
      test: /\.po/,
      use: ["@lingui/loader"],
    });

    return config;
  },
};

module.exports = withMDX(config);
