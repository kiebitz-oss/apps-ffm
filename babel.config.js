const config = {
  presets: ["@babel/preset-env", "@babel/preset-typescript"],
  plugins: ["macros"],
  babelrcRoots: ["apps/*", "packages/*"],
};

module.exports = config;
