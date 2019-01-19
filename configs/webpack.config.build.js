const path = require('path');
const webpack = require('webpack');

module.exports = function (entry) {
  return {
    entry,
    output: {
      path: '/',
      filename: 'bundle.js',
    },
    target: 'web',
    mode: 'development',
    plugins: [
      new webpack.DefinePlugin({
        LOGS_TYPE_LOG: 0,
        LOGS_TYPE_WARN: 1,
        LOGS_TYPE_ERROR: 2,
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
              presets: ['env'],
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
