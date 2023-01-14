const path = require("path");
const { merge } = require("webpack-merge");
const nodeExternals = require("webpack-node-externals");
const NodemonPlugin = require("nodemon-webpack-plugin"); // Ding

const config = require("./webpack.config");

const isDev = process.env.NODE_ENV !== "production";

module.exports = merge(config, {
  target: "node",
  entry: "./server/index.tsx",
  externals: [nodeExternals()],
  output: {
    path: path.resolve(__dirname, "build", "server"),
    filename: "index.js"
  },
  plugins: [isDev ? new NodemonPlugin() : null].filter((p) => !!p)
});
