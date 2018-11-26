export default [
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () =>
      import(/* webpackChunkName: "dashboard" */ './views/Overview.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/dashboard/institutions',
    name: 'institutions',
    component: () =>
      import(/* webpackChunkName: "dashboard" */ './views/Institutions.vue'),
    meta: { requiresAuth: true },
  },
];
