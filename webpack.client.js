const path = require("path");
const { merge } = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");

const config = require("./webpack.config");

module.exports = merge(config, {
  target: "web",
  entry: "./src/index.tsx",
  output: {
    path: path.resolve(__dirname, "build", "client"),
    filename: "index.js",
    publicPath: "/",
    libraryTarget: "umd"
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html"
    }),
    new CompressionPlugin({
      test: /\.js(\?.*)?$/i
    })
  ]
});
