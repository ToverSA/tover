import * as components from './components';

export default [
  {
    path: '/admin',
    component: components.Dashboard,
    meta: { requiresAuth: true }
  }
];
