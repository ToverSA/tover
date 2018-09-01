import Auth from './views/Auth.vue';
const Dashboard = () => import('./views/Dashboard.vue');
const Overview = () => import('./components/Overview.vue');

export default [
  {
    path: '/auth',
    name: 'auth',
    component: Auth,
    meta: { requiresNoAuth: true },
  },
  {
    path: '/dashboard',
    component: Dashboard,
    meta: { requiresAuth: false },
    children: [
      {
        path: '',
        name: 'dashboard',
        component: Overview,
      },
    ],
  },
];
