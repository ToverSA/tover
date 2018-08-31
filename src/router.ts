import Vue from 'vue';
import Router from 'vue-router';

import store from '@/store';

import users from '@/users/routes';
import dashboard from '@/dashboard/routes';
import market from '@/market/routes';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    ...users,
    ...market,
    ...dashboard,
  ],
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!store.getters.loggedIn) {
      next({
        path: '/auth',
        query: { redirect: to.fullPath },
      });
    }
    next();
  }
  if (to.matched.some((record) => record.meta.requiresNoAuth)) {
    if (store.getters.loggedIn) {
      next({
        path: '/',
      });
    }
    next();
  }
  next();
});

export default router;
