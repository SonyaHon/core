import Events from 'events';
import uuid from 'uuid/v1';

class Connection extends Events {
  constructor(endpoint, socket, info) {
    super();
    this.uuid = uuid();
    this.endpoint = endpoint;
    this.socket = socket;
    this.socket.on('--METHOD--CALL--', (options) => {

    });
  }

  getUUID() {
    return this.uuid;
  }

  broadcast(name, args) {}
}

export default Connection;
