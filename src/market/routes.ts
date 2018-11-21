export default [
  {
    path: '/about',
    name: 'about',
    component: () =>
      import(/* webpackChunkName: "market" */ './views/About.vue'),
  },
  {
    path: '/item/:id',
    name: 'item',
    component: () => import(/* webpackChunkName: "market" */ './views/Item.vue'),
  },
  {
    path: '/post/preview',
    name: 'postPreview',
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
        component: () =>
          import(/* webpachChunkName: "market" */ './components/Browse.vue'),
      },
      {
        path: 'search',
        name: 'search',
        component: () =>
          import(/* webpackChunkName: "market" */ './components/Search.vue'),
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
    path: '/sell',
    name: 'sell',
    component: () =>
      import(/* webpackChunkName: "market" */ './views/Sell.vue'),
    meta: { requiresAuth: true },
  },
];
