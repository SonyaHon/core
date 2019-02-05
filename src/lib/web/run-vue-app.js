import Vue from 'vue';
import Vuetify from 'vuetify';
import VuePlugin from './vue-plugin';

Vue.use(Vuetify);
Vue.use(VuePlugin);

import 'vuetify/dist/vuetify.min.css';
import 'material-icons/iconfont/material-icons.css';


export default (app) => {
  new Vue({
    el: '#root',
    render: h => h(app),
  });
};
