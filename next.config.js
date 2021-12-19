// @ts-check
const webpack = require("webpack");
const withMDX = require("@next/mdx")({
  extension: /\.mdx$/,
});

/**
 * @type {import('next').NextConfig}
 **/
const config = {
  reactStrictMode: true,
  swcMinify: false,
  cleanDistDir: true,
  trailingSlash: true,
  experimental: {
    outputStandalone: true,
  },

  pageExtensions: ["tsx", "mdx"],

  webpack: (config) => {
    config.resolve.fallback = {
      buffer: require.resolve("buffer/"),
      process: require.resolve("process/browser"),
    };

    config.plugins.push(
      new webpack.IgnorePlugin({ resourceRegExp: /\/.stories.tsx\// })
    );

    return config;
  },
};

module.exports = withMDX(config);
