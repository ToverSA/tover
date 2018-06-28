import './app/app.scss';
import Vue from 'vue';
import { App } from './app';
import store from './store';
import router from './router';
Vue.prototype.$eventBus = new Vue();
new Vue({
  router,
  el: '#akomo',
  store,
  render: h => h(App)
});
