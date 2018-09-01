import Auth from './views/Auth.vue';

const Dashboard = () => import('./views/Dashboard.vue');

const Admin = () => import('./components/Admin.vue');
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
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        name: 'dashboard',
        component: Overview,
      },
      {
        path: 'admin',
        name: 'admin',
        component: Admin,
      },
    ],
  },
];
