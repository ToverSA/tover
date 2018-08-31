const Dashboard = () => import('./views/Dashboard.vue');

export default [
  {
    path: '/internal',
    name: 'dashboard',
    component: Dashboard,
  },
];
