const webpack = require('webpack');
const path = require('path');

const ENV = process.env.ENV || 'development';

module.exports = {
  context: path.join(__dirname, '../src/lib/'),
  entry: ['@babel/polyfill', './index.js'],
  output: {
    path: path.join(__dirname, '../build/'),
    library: 'core',
    libraryExport: 'default',
    libraryTarget: 'umd',
    umdNamedDefine: true,
    filename: 'core.lib.js',
  },
  target: 'node',
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
    ],
  },
};
