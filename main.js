import './app/app.scss';
import Vue from 'vue';
import { App } from './app';
import router from './router';

new Vue({
  router,
  el: '#akomo',
  template: '<App/>',
  components: { App }
});
