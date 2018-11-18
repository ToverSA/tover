export default [
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () =>
      import(/* webpackChunkName: "admin" */ './views/Overview.vue'),
    meta: { requiresAuth: true },
  },
];
