import * as components from './components';

export default [
  {
    path: '/admin',
    component: components.Dashboard,
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        component: components.Analytics,
        name: 'Analytics'
      },
      {
        path: 'campuses',
        component: components.Campuses,
        name: 'Campuses'
      }
    ]
  }
];
