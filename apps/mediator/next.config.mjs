import nextMDX from "@next/mdx";

/**
 * @type {import('next').NextConfig}
 **/
const config = {
  poweredByHeader: false,
  reactStrictMode: true,
  cleanDistDir: true,
  trailingSlash: true,
  pageExtensions: ["page.tsx", "page.mdx"],
  basePath: process.env.NEXT_MEDIATOR_BASEPATH || "",
  experimental: {
    externalDir: true,
    scrollRestoration: true,
    esmExternals: true,
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

    return config;
  },
};

export default nextMDX()(config);
