const task = require('../async/task');

module.exports = async function socketHandshake(socket, info) {
  if (socket.disconnected) await task(socket, 'on', 'connect');
  socket.emit('--INIT--INFO--', info);
  return (await task(socket, 'on', '--INIT-SUCCESS--'))[0];
};
