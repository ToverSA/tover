import * as components from './components';

export default [
  {
    path: '/account',
    component: components.Account,
    meta: { requiresAuth: true }
  },
  {
    path: '/auth',
    component: components.Auth
  }
];
