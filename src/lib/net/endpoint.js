import Events from 'events';
import IO from 'socket.io';
import express from 'express';
import HTTP from 'http';
import path from 'path';
import ip from 'ip';
import IOCL from 'socket.io-client';

import Creators from '../creators';
import ConnectionManager from './connection-manager';
import Logger from '../logger';
import socketHandShake from './socket-handshake';
import Decorators from '../decorators';

class Endpoint extends Events {
  constructor(props) {
    super();
    this.props = props;
    this.connectionManager = new ConnectionManager(this);
    this.expressApp = express();
    this.http = HTTP.Server(this.expressApp);
    this.io = IO(this.http, {serveClient: false});
    // TODO generation with webpack
    this.expressApp.get('/', (req, res) => {
      res.send(Creators.dotHTML(this.props.name));
    });
    // TODO: move this to generation with webpack
    this.expressApp.get('/io-client', (req, res) => {
      res.sendFile(path.join('d:/workspace/core/node_modules/socket.io-client/dist/socket.io.js'));
    });
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
    };

    // TODO: Parse @remote decorators stuff and update info
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
    this.http.listen(this.props.port, () => {
      this.logger.log(`Endpoint ${this.props.name} has started. http://localhost:${this.props.port} || http://${ip.address()}:${this.props.port}`);
    });
  }

  @Decorators.remote({bool: true})
  testMethod() {
    console.log(`Kek: ${this.props.name}`);
  }
}

export default Endpoint;
