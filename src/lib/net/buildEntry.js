import webpack from 'webpack';
import MemFS from 'memory-fs';
import configurator from '../../../configs/webpack.config.build';
import async from '../async';

export default async function (entry) {
  const config = configurator(entry);
  const fs = new MemFS();
  const compiler = webpack(config);
  compiler.outputFileSystem = fs;
  const res = await async.task(compiler, 'run');
  if (!res[0] && !res[1].hasErrors()) {
    console.log(fs.readFileSync('/bundle.js'));
  } else {
    console.log(res[0]);
    console.log(res[1].toJson('minimal'));
  }
}
