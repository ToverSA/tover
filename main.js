import './app/app.scss';
import Vue from 'vue';
import Vuex from 'vuex';
import { App } from './app';
import store from './store';
import router from './router';

new Vue({
  router,
  el: '#akomo',
  store,
  render: h => h(App)
});
