const Events = require('events');
const IO = require('socket.io');
const express = require('express');
const HTTP = require('http');
const path = require('path');
const ip = require('ip');
const IOCL = require('socket.io-client');

const Creators = require('../creators');
const ConnectionManager = require('./connection-manager');
const Logger = require('../logger');
const socketHandShake = require('./socket-handshake');
const task = require('../async/task');
const buildEntry = require('./buildEntry');

class Endpoint extends Events {
  constructor(props) {
    super();
    this.props = props;
    this.connectedServices = {};
    this.connectionManager = new ConnectionManager(this);
    this.expressApp = express();
    this.http = HTTP.Server(this.expressApp);
    this.io = IO(this.http, { serveClient: false });
    // TODO generation with webpack

    this.expressApp.get('/', (req, res) => {
      res.send(Creators.dotHTML(this.props.name));
    });
    if (!this.props.status || this.props.status === 'development') {
      this.expressApp.get('/bundle.js', async (req, res) => {
        const bundle = await buildEntry('d:/workspace/core/src/lib/404-entry/entry.js');
        res.send(bundle);
      });
    } else {

    }
    this.io.on('connection', (sock) => {
      this.connectionManager.addSocketConnection(sock);
    });
    this.mode = this.props.mode || 'online';
    this.logger = new Logger({
      console: true,
    });
    if (!this.props.name) {
      this.logger.warn('Endpoint name is not defined');
    }
    this.info = {
      name: this.props.name,
      description: this.props.description,
      source: 'endpoint',
      methods: {
        getService: { service: true },
      },
    };
  }

  goSilent() {
    this.mode = 'silent';
    this.emit('mode-change');
  }

  goOffline() {
    this.mode = 'offline';
    this.emit('mode-change');
  }

  goOnline() {
    this.mode = 'online';
    this.emit('mode-change');
  }

  async connectToEndpointViaSocket(address) {
    const sock = IOCL(address);
    const result = await socketHandShake(sock, this.info);
    return Creators.localEndpointInstance(sock, result);
  }

  async start() {
    await task(this.http, 'listen', this.props.port);
    this.logger.log(`Endpoint ${this.props.name} has started. http://localhost:${this.props.port} || http://${ip.address()}:${this.props.port}`);
  }

  fire(event, ...args) {
    this.connectionManager.emit('broadcast-event', event, args);
  }

  addServiceInstance(serviceInstance) {
    if (!this.connectedServices[serviceInstance.name]) {
      serviceInstance._bindToEndpoint(this);
      this.connectedServices[serviceInstance.name] = serviceInstance;
    }
  }

  removeServiceInstance(serviceInstance) {
    if (this.connectedServices[serviceInstance.name]) {
      serviceInstance._bindToEndpoint(null);
      delete this.connectedServices[serviceInstance.name];
    }
  }

  _broadcastFromService(name, event, args) {
    this.connectionManager.emit('broadcast-event-from-service', name, event, args);
  }

  async _callServiceMethod(opts) {
    return (this.connectedServices[opts.service])[opts.method](...opts.args);
  }

  async getService(name) {
    return this.connectedServices[name].info;
  }
}

module.exports = Endpoint;
