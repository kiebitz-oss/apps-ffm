/**
 * @type {import('next').NextConfig}
 **/
const config = {
  poweredByHeader: false,
  reactStrictMode: true,
  trailingSlash: true,
  pageExtensions: ["page.tsx", "page.mdx"],
  basePath: process.env.NEXT_MEDIATOR_BASEPATH || undefined,
  experimental: {
    cpus: 4,
    externalDir: true,
  },
  images: {
    disableStaticImages: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
    dirs: ["src"],
  },
  env: {
    NEXT_PUBLIC_APPOINTMENTS_ENDPOINT:
      process.env.KIEBITZ_APPOINTMENTS_ENDPOINT,
    NEXT_PUBLIC_STORAGE_ENDPOINT: process.env.KIEBITZ_STORAGE_ENDPOINT,
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.(woff2|jpe?g|svg)$/,
      type: "asset/resource",
    });

    config.module.rules.push({
      test: /\.mdx?$/,
      use: [
        {
          loader: "@mdx-js/loader",
          /** @type {import('@mdx-js/loader').Options} */
          options: {},
        },
      ],
    });

    return config;
  },
};

export default config;
