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

  pageExtensions: ["page.tsx", "page.mdx"],

  webpack: (config) => {
    config.plugins.push(
      new webpack.IgnorePlugin({ resourceRegExp: /\/.stories.tsx\// })
    );

    return config;
  },
};

module.exports = withMDX(config);
