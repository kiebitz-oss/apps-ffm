import { mdsvex } from "mdsvex";
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
    package: {
      dir: "dist",
      exports: "src",
    },
  },

  vite: () => ({
    plugins: [
      Icons({
        compiler: "svelte",

        // expiremental
        autoInstall: true,
      }),
    ],
  }),
};

export default config;
