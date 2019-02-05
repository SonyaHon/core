const Events = require('events');

class BaseService extends Events {
  constructor(name, remoteMethods) {
    super(remoteMethods);
    this.name = name;
    this.info = {
      name: this.name,
      methods: remoteMethods || {},
    };
    this._endpoint = null;
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

module.exports = BaseService;
