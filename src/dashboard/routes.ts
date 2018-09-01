const Dashboard = () => import('./views/Dashboard.vue');
const Overview = () => import('./components/Overview.vue');

export default [
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
