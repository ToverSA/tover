import Vue from 'vue';
import Router from 'vue-router';
import market from '@/market/routes';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    ...market,
  ],
});
