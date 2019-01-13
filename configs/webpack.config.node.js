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
    new webpack.ProvidePlugin({
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: [
              ['@babel/plugin-proposal-decorators', { decoratorsBeforeExport: true }],
              ['@babel/plugin-proposal-class-properties'],
            ],
          },
        },
      },
    ],
  },
};
