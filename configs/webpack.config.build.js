const path = require('path');
const webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader');
module.exports = function (entry) {
  return {
    entry: ['@babel/polyfill', entry],
    output: {
      path: '/',
      filename: 'bundle.js',
    },
    target: 'web',
    mode: 'development',
    plugins: [
      new VueLoaderPlugin.VueLoaderPlugin(),
      new webpack.DefinePlugin({
        LOGS_TYPE_LOG: 'log',
        LOGS_TYPE_WARN: 'warn',
        LOGS_TYPE_ERROR: 'error',
      }),
    ],
    devtool: 'eval',
    module: {
      rules: [
        {
          test: /\.vue$/,
          loader: 'vue-loader',
        },
        {
          test: /\.js$/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        },
        {
          test: /\.css$/,
          use: [
            'vue-style-loader',
            'css-loader',
          ],
        },
        {
          test: /\.(png|jpg|gif|svg|ttf|woff|woff2|eot)$/,
          loader: 'file-loader',
          options: {
            name: '[name].[ext]?[hash]',
          },
        },
      ],
    },

  };
};
