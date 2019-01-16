import task from '../async/task';

async function call(sock, settings) {
  sock.emit('--METHOD--CALL--', settings);
  const res = await task(sock, 'on', '--METHOD--CALL--RESULT--');
  return res[0];
}

export default (socket, settings) => {
  const res = {};
  Object.keys(settings.info.methods).forEach((method) => {
    res[method] = async (...args) => call(socket, {
      id: settings.id,
      args,
      options: settings.info.methods[method],
      method,
    });
  });
  res.subscribe = (event, callback) => {
    socket.emit('--SUBSCRIBE--TO--EVENT--', event);
    socket.on(`--EVENT--${event}--FIRED--`, callback);
  };
  res.unsubscribe = (event) => {
    socket.emit('--UNSUBSCRIBE--FROM--EVENT--', event);
    socket.removeListener(`--EVENT--${event}--FIRED--`);
  };
  return res;
};
