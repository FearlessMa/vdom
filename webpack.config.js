const path = require("path");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "./dist")
  },
  devServer: {
    port: 9000,
    contentBase: path.resolve(__dirname, "./test/")
  }
};