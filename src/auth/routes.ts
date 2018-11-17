export default [
  {
    path: '/auth',
    name: 'auth',
    component: () =>
      import(/* webpackChunkName: "market" */ './views/Auth.vue'),
    meta: { requiresNoAuth: true },
  },
];
