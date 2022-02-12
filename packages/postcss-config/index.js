module.exports = {
  plugins: {
    "postcss-import": {},
    "postcss-preset-env": {
      // debug: true,
      stage: 3,
      autoprefixer: {
        flexbox: "no-2009",
      },
      features: {
        "nesting-rules": true,
        "custom-media-queries": true,
      },
    },
  },
};
