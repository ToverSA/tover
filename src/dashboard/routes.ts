export default [
  {
    path: '/dashboard',
    component: () =>
      import(/* webpackChunkName: "admin" */ './views/Dashboard.vue'),
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        name: 'dashboard',
        component: () =>
          import(/* webpackChunkName: "admin" */ './components/Overview.vue'),
      },
      {
        path: 'create-campus',
        name: 'createCampus',
        component: () =>
          import(/* webpackChunkName: "admin" */ './components/CreateCampus.vue'),
      },
      {
        path: 'create-institution',
        name: 'createInstitution',
        component: () =>
          import(/* webpackChunkName "admin" */ './components/CreateInstitution.vue'),
      },
    ],
  },
];
