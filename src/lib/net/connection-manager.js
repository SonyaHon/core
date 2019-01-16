import Events from 'events';
import Connection from './connection';

import task from '../async/task';

class ConnectionManager extends Events {
  constructor(endpoint) {
    super();
    this.endpoint = endpoint;
    this.connections = [];
    this.on('broadcast-event', (name, args) => {
      this.connections.forEach((connection) => {
        connection.broadcast(name, args);
      });
    });
  }

  async addSocketConnection(socket) {
    if (this.endpoint.mode === 'online' || this.endpoint.mode === 'silent') {
      const info = (await task(socket, 'on', '--INIT--INFO--'))[0];
      if (this.endpoint.mode === 'silent' && info.source === 'web') {
        socket.close();
        return;
      }
      const connection = new Connection(this.endpoint, socket, info);
      this.connections.push(connection);
      connection.on('close', () => {
        delete this.connections[this.connections.indexOf(connection)];
      });
      socket.emit('--INIT-SUCCESS--', {
        id: connection.getUUID(),
        info: this.endpoint.info,
      });
    } else {
      socket.close();
    }
  }
}

export default ConnectionManager;
