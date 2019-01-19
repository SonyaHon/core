import Vue from 'vue';
import Vuesax from 'vuesax';
import 'vuesax/dist/vuesax.css';
import 'material-icons/iconfont/material-icons.css';
import VuePlugin from './vue-plugin';

Vue.use(Vuesax);
Vue.use(VuePlugin);


export default (app) => {
  new Vue({
    el: '#root',
    render: h => h(app),
  });
};
