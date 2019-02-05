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
          options: {
            loaders: {
              sass: [
                {
                  loader: 'css-loader',
                },
                {
                  loader: 'sass-loader',
                  options: {
                    indentedSyntax: false, // Set to true to use indented SASS syntax.
                  },
                },
              ],
            },
          },
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
          loader: 'css-loader',
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
    resolve: {
      alias: {
        vue$: 'vue/dist/vue.esm.js',
      },
    },
  };
};
