import * as components from './components';

export default [
  {
    path: '/account',
    component: components.AccountView,
    meta: { requiresAuth: true }
  },
  {
    path: '/auth',
    component: components.AuthView
  }
];
