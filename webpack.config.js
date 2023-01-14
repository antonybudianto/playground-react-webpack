const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  mode: "development",
  stats: "minimal",
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"]
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        minify: TerserPlugin.swcMinify,
        // `terserOptions` options will be passed to `swc` (`@swc/core`)
        // Link to options - https://swc.rs/docs/config-js-minify
        terserOptions: {}
      })
    ]
  },
  plugins: [new MiniCssExtractPlugin()],
  module: {
    rules: [
      {
        test: /\.[tj]sx?$/,
        exclude: /node_modules/,
        use: {
          loader: "swc-loader",
          options: {
            module: {
              type: "es6"
            },
            minify: process.env.NODE_ENV !== "development",
            isModule: true,
            jsc: {
              minify: {
                compress: {
                  ecma: 5,
                  // The following two options are known to break valid JavaScript code (Taken from next.js)
                  comparisons: false,
                  inline: 2 // https://github.com/vercel/next.js/issues/7178#issuecomment-493048965
                },
                mangle: true,
                format: {
                  asciiOnly: true,
                  comments: /^ webpack/
                }
              },
              target: "es2016",
              parser: {
                syntax: "typescript",
                tsx: true
              },
              experimental: {
                plugins: [
                  /**
                   * Put your custom rust-based swc plugin here
                   */
                ]
              },
              transform: {
                react: {
                  runtime: "automatic"
                }
              }
            }
          }
        }
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"]
      }
    ]
  }
};
