let path = require("path");

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

let conf = {
  entry: "./src/app/index.jsx",
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "main.js",
    publicPath: ""
  },
  devServer: {
    overlay: true,
    contentBase: './src',
    watchContentBase: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: "/node_modules/"
      },
      {
        test: /\.jsx$/,
        loader: "babel-loader",
        exclude: "/node_modules/"
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract(
          {
            fallback: 'style-loader',
            use: ['css-loader', 'sass-loader']
          })
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin(
      {
        filename: 'style.css'
      }
    ),
    new HtmlWebpackPlugin({
      inject: false,
      hash: true,
      template: './src/index.html',
      filename: 'index.html'
    })
  ]
}

module.exports = (env, options) => {
  let production = options.mode === "production";
  conf.devtool = production
    ? "source-map"
    : "eval-sourcemap";
  return conf;
}
