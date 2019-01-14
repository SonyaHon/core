import task from '../async/task';

export default async (socket, info) => {
  await task(socket, 'on', 'connect');
  socket.emit('--INIT--INFO--', info);
  return (await task(socket, 'on', '--INIT-SUCCESS--'))[0];
};
