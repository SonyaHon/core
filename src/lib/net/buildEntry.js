const webpack = require('webpack');
const MemFS = require('memory-fs');
const configurator = require('../../../configs/webpack.config.build');
const async = require('../async');

module.exports = async function conf(entry) {
  const config = configurator(entry);
  const fs = new MemFS();
  const compiler = webpack(config);
  compiler.outputFileSystem = fs;
  const res = await async.task(compiler, 'run');
  if (!res[0] && !res[1].hasErrors()) {
    return fs.readFileSync('/bundle.js');
  }
  return res[1].toJson('minimal').errors;
};
