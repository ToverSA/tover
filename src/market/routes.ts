export default [
  {
    path: '/about',
    name: 'about',
    component: () =>
      import(/* webpackChunkName: "market" */ './views/About.vue'),
  },
  {
    path: '/auth',
    name: 'auth',
    component: () =>
      import(/* webpackChunkName: "market" */ './views/Auth.vue'),
    meta: { requiresNoAuth: true },
  },
  {
    path: '/item/:id',
    name: 'item',
    component: () => import(/* webpackChunkName: "market" */ './views/Item.vue'),
  },
  {
    path: '/',
    component: () =>
      import(/* webpackChunkName: "market" */ './views/Home.vue'),
    children: [
      {
        path: '',
        name: 'home',
        component: () =>
          import(/* webpackChunkName: "market" */ './components/Summary.vue'),
      },
      {
        path: 'campus/:id',
        name: 'campus',
        component: () =>
          import(/* webpackChunkName: "market" */ './components/Summary.vue'),
      },
      {
        path: 'more/:name',
        name: 'more',
        component: () =>
          import(/* webpachChunkName: "market" */ './components/More.vue'),
      },
      {
        path: 'browse',
        name: 'browse',
        component: () => import('./components/Browse.vue'),
      },
    ],
  },
  {
    path: '/profile',
    name: 'profile',
    component: () =>
      import(/* webpackChunkName: "market" */ './views/Profile.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/search',
    name: 'search',
    component: () =>
      import(/* webpackChunkName: "market" */ './views/Search.vue'),
  },
  {
    path: '/sell',
    name: 'sell',
    component: () =>
      import(/* webpackChunkName: "market" */ './views/Sell.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/create-account',
    name: 'signup',
    component: () =>
      import(/* webpackChunkName: "market" */ './views/Signup.vue'),
    meta: { requiresNoAuth: true },
  },
];
