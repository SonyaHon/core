import SocketIOClient from 'socket.io-client';

class VuePlugin {
  install(Vue, options) {
    Vue.prototype.$connectToEndpoint = function (address) {
      console.log(address);
    };
  }
}

const plugin = new VuePlugin();
export default plugin;
