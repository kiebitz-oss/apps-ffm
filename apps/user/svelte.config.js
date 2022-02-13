import adapter from "@sveltejs/adapter-static";
import { mdsvex } from "mdsvex";
import precompileIntl from "svelte-intl-precompile/sveltekit-plugin";
import preprocess from "svelte-preprocess";
import Icons from "unplugin-icons/vite";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: [
    mdsvex({
      extensions: [".md", ".mdx"],
    }),
    preprocess({
      postcss: true,
    }),
  ],

  extensions: [".svelte", ".md", ".mdx"],

  kit: {
    adapter: adapter({
      pages: "dist",
      assets: "dist",
      // fallback: "200.html",
      precompress: true,
    }),

    prerender: {
      crawl: true,
      enabled: true,
    },

    trailingSlash: "always",

    // csp: {
    //   mode: "auto",
    //   directives: {
    //     "base-uri": ["self"],
    //     "font-src": ["self"],
    //     //     "default-src": ["none"],
    //     "prefetch-src": ["self"],
    //     //     "style-src": ["self", "unsafe-inline"],
    //     "manifest-src": ["self"],
    //     "connect-src": ["self"],
    //     //     "script-src": ["self", "unsafe-inline", "strict-dynamic"],
    //     "img-src": ["self", "data:"],
    //   },
    // },

    version: {
      name: Date.now().toString(), // default to timestamp
      pollInterval: 600000, // default to checking once a minute, in milliseconds
    },

    vite: () => ({
      plugins: [
        precompileIntl("locales"),

        Icons({
          compiler: "svelte",

          // expiremental
          autoInstall: true,
        }),
      ],
    }),
  },
};

export default config;
