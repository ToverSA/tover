const Dashboard = () =>
  import(/* webpackChunkName: "v" */ './views/Dashboard.vue');

const Admin = () =>
  import(/* webpackChunkName: "c" */ './components/Admin.vue');
const Overview = () =>
  import(/* webpackChunkName: "c" */ './components/Overview.vue');

export default [
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
