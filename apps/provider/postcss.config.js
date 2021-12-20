// If you want to use other PostCSS plugins, see the following:
// https://tailwindcss.com/docs/using-with-preprocessors

const config = {
  plugins: {
    "tailwindcss/nesting": {},
    tailwindcss: {},
    "postcss-flexbugs-fixes": {},
    "postcss-preset-env": {
      autoprefixer: {
        flexbox: "no-2009",
      },
      stage: 3,
      features: {
        "nesting-rules": false,
        "custom-properties": false,
      },
    },
  },
};

module.exports = config;
