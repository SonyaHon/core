import SocketIOClient from 'socket.io-client';
import socketHandShake from '../net/socket-handshake';
import Creators from '../creators';

class VuePlugin {
  install(Vue, options) {
    Vue.prototype.$connectToEndpoint = async function connect(address) {
      const sock = SocketIOClient(address);
      const result = await socketHandShake(sock, {
        source: 'web',
      });
      return Creators.localEndpointInstance(sock, result);
    };
  }
}

const plugin = new VuePlugin();
export default plugin;
