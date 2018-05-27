const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const outputPath = '/var/www/html';

module.exports = {
  mode: "development",
  entry: {
    app: './main.js'
  },
  output: {
    filename: '[name].min.js',
    // path: path.resolve(__dirname, 'dist'),
    path: outputPath,
    publicPath: '/'
  },
  devtool: 'source-map',
  devServer: {
    contentBase: './dist',
    hot: true
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.js'
    },
    extensions: ['*', '.js', '.vue', '.json']
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'libs',
          chunks: 'all'
        }
      }
    }
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].min.css',
      // path: path.resolve(__dirname, 'dist')
      path: outputPath
    }),
    new CleanWebpackPlugin([outputPath], { exclude: ['api'], allowExternal: true }),
    new HtmlWebpackPlugin({
      title: 'Tover',
      filename: 'index.html',
      template: './index.html',
      favicon: './favicon.ico'
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader'
        ]
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(png|svg|gif|jpg|jpeg)$/,
        use: [
          'file-loader'
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader'
        ]
      },
      {
        test: /\.vue$/,
        use: {
          loader: 'vue-loader',
          options: {
            loaders: {
              scss: 'vue-style-loader!css-loader!sass-loader', // <style lang="scss">
              sass: 'vue-style-loader!css-loader!sass-loader?indentedSyntax' // <style lang="sass">
            },
            // loaders: {
            //   scss: [ MiniCssExtractPlugin.loader, 'css-loader!sass-loader' ], // <style lang="scss">
            //   sass: [ MiniCssExtractPlugin.loader, 'css-loader!sass-loader?indentedSyntax' ] // <style lang="sass">
            // }
          }
        }
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          'babel-loader'
        ]
      }
    ]
  }
};
