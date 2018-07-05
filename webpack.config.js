const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const webpack = require("webpack");

module.exports = {
  entry: {
    app: "./main.js"
  },
  output: {
    filename: "[name].[hash].js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "/"
  },
  devtool: "source-map",
  devServer: {
    contentBase: "./dist",
    hot: true
  },
  resolve: {
    extensions: ["*", ".js", ".vue", ".json"]
  },
  optimization: {
    splitChunks: {
      chunks: "all",
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: "libs",
          chunks: "all"
        }
      }
    }
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: "Tover",
      filename: "index.html",
      template: "./index.html",
      favicon: "./favicon.ico"
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["css-loader"]
      },
      {
        test: /\.scss$/,
        use: ["css-loader", "sass-loader"]
      },
      {
        test: /\.(png|svg|gif|jpg|jpeg)$/,
        use: ["file-loader"]
      },
      {
        test: /manifest.json$/,
        loader: "file-loader?name=manifest.json!web-app-manifest-loader"
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ["file-loader"]
      },
      {
        test: /\.vue$/,
        use: {
          loader: "vue-loader",
          options: {
            loaders: {
              scss: "vue-style-loader!css-loader!sass-loader", // <style lang="scss">
              sass: "vue-style-loader!css-loader!sass-loader?indentedSyntax" // <style lang="sass">
            }
          }
        }
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["babel-loader"]
      }
    ]
  }
};
