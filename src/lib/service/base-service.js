import Events from 'events';

class BaseService extends Events {
  constructor(name) {
    super();
    this.name = name;
    this.info = {
      name: this.name,
      methods: {},
    };
    this._endpoint = null;

    const self = this;
    setTimeout(() => {
      const remotes = Object.keys(self).filter(prop => prop.match(/remote@@.*/));
      for (let i = 0; i < remotes.length; i += 1) {
        const c = remotes[i];
        const key = c.substring(8);
        self.info.methods[key] = self[c];
        delete self[c];
      }
    }, 0);
  }

  _bindToEndpoint(endpoint) {
    this._endpoint = endpoint;
  }

  fire(event, ...args) {
    if (!this._endpoint) {
      console.error('Service must  be bind to use .fire method');
    }
    this._endpoint._broadcastFromService(this.name, event, args);
  }
}

export default BaseService;
