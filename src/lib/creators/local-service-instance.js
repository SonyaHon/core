import task from '../async/task';

async function call(sock, settings) {
  sock.emit('--SERVICE--METHOD--CALL--', settings);
  const res = await task(sock, 'on', '--SERVICE--METHOD--CALL--RESULT--');
  return res[0];
}

export default (socket, settings) => {
  const res = {};
  Object.keys(settings.methods).forEach((method) => {
    res[method] = (...args) => call(socket, {
      args,
      method,
      service: settings.name,
    });
  });
  res.subscribe = (event, callback) => {
    socket.emit('--SUBSCRIBE--TO--SERVICE--EVENT--', settings.name, event);
    socket.on(`--SERVICE--${settings.name}--EVENT--${event}--FIRED--`, callback);
  };
  res.unsubscribe = (event) => {
    socket.emit('--UNSUBSCRIBE--FROM--SERVICE--EVENT--', settings.name, event);
    socket.removeListener(`--SERVICE--${settings.name}--EVENT--${event}--FIRED--`);
  };
  return res;
};
