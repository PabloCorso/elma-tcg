const HtmlWebpackPlugin = require("html-webpack-plugin");

// From: https://github.com/ivarprudnikov/webpack-static-html-pages
module.exports = {
  // This option controls if and how source maps are generated.
  // https://webpack.js.org/configuration/devtool/
  devtool: "eval-cheap-module-source-map",

  // https://webpack.js.org/concepts/entry-points/#multi-page-application
  entry: {
    index: "./src/js/index.jsx",
  },

  output: {
    publicPath: "",
  },

  // https://webpack.js.org/configuration/dev-server/
  devServer: {
    port: 8080,
    writeToDisk: false, // https://webpack.js.org/configuration/dev-server/#devserverwritetodisk-
  },

  resolve: {
    extensions: [".js", ".jsx"],
  },

  // https://webpack.js.org/concepts/loaders/
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          presets: [
            [
              "@babel/preset-env",
              {
                targets: {
                  esmodules: true,
                },
              },
            ],
            "@babel/preset-react",
          ],
        },
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        // https://github.com/lifenautjoe/webpack-starter-basic#how-to-load-images
        test: /\.(png|jpe?g|gif|svg)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              // On development we want to see where the file is coming from, hence we preserve the [path]
              name: "[path][name].[ext]?hash=[hash:20]",
              esModule: false,
            },
          },
        ],
      },
    ],
  },

  // https://webpack.js.org/concepts/plugins/
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/views/index.html",
      inject: true,
      chunks: ["index"],
      filename: "index.html",
    }),
  ],
};
