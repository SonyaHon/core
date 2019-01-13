import Events from 'events';
import IO from 'socket.io';


class Endpoint extends Events {
  constructor(props) {
    super();
    this.props = props;
    this.io = new IO(props.port, {});
    this.mode = this.props.mode;
  }

  async goSilent() {

  }

  async goOffline() {

  }

  async goOnline() {

  }

  async discoverLocalEndpoints() {

  }

  async connectToEndpoint() {

  }

  async start() {

  }
}

export default Endpoint;
