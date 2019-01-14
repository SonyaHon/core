import Events from 'events';
import uuid from 'uuid/v1';

class Connection extends Events {
  constructor(endpoint, socket, info) {
    super();
    this.uuid = uuid();
    this.endpoint = endpoint;
    this.socket = socket;
  }

  getUUID() {
    return this.uuid;
  }
}

export default Connection;
