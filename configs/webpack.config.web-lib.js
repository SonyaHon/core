const path = require('path');
const webpack = require('webpack');

const ENV = process.env.ENV || 'development';

module.exports = {
  context: path.join(__dirname, '../src/lib/web/'),
  entry: ['@babel/polyfill', './index.js'],
  output: {
    path: path.join(__dirname, '../build/'),
    library: 'core-web',
    libraryExport: 'default',
    libraryTarget: 'umd',
    umdNamedDefine: true,
    filename: 'core.web-lib.js',
  },
  target: 'web',
  mode: ENV,
  plugins: [
    new webpack.DefinePlugin({
      LOGS_TYPE_LOG: 0,
      LOGS_TYPE_WARN: 1,
      LOGS_TYPE_ERROR: 2,
    }),
  ],
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
            plugins: [
              ['@babel/plugin-proposal-decorators', { decoratorsBeforeExport: true }],
            ],
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
