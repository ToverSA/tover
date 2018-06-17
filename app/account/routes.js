import * as components from './components';

export default [
  {
    path: '/account',
    component: components.Account,
    meta: { requiresAuth: true },
    children : [
      {
        path: '',
        component: components.Adverts,
        name: 'Adverts'
      },
      {
        path: 'profile',
        component: components.Profile,
        name: 'Profile'
      }
    ]
  },
  {
    path: 'auth',
    component: components.Auth,
    name: 'Auth'
  }
];
