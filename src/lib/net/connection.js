import Events from 'events';
import uuid from 'uuid/v1';

class Connection extends Events {
  constructor(endpoint, socket, info) {
    super();
    this.uuid = uuid();
    this.endpoint = endpoint;
    this.socket = socket;
    this.subscribedEvents = [];
    this.socket.on('--METHOD--CALL--', async (options) => {
      if (this.uuid === options.id) {
        if (options.return && options.return === 'service') {

        } else {
          const results = await this.endpoint[options.method](...options.args);
          this.socket.emit('--METHOD--CALL--RESULT--', results);
        }
      }
    });
    this.socket.on('--SUBSCRIBE--TO--EVENT--', (event) => {
      if (this.subscribedEvents.indexOf(event) === -1) {
        this.subscribedEvents.push(event);
      }
    });
    this.socket.on('--UNSUBSCRIBE--FROM--EVENT--', (event) => {
      if (this.subscribedEvents.indexOf(event) !== -1) {
        this.subscribedEvents.splice(this.subscribedEvents.indexOf(event), 1);
      }
    });
  }

  getUUID() {
    return this.uuid;
  }

  broadcast(name, args) {
    if (this.subscribedEvents.indexOf(name) !== -1) {
      this.socket.emit(`--EVENT--${name}--FIRED--`, ...args);
    }
  }
}

export default Connection;
