export default [
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () =>
      import(/* webpackChunkName: "admin" */ './views/Overview.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/dashboard/institutions',
    name: 'institutions',
    component: () =>
      import(/* webpackChunkName: "admin" */ './views/Institutions.vue'),
    meta: { requiresAuth: true },
  },
];
