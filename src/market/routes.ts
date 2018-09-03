import Home from './views/Home.vue';
import Search from './views/Search.vue';

const Profile = () => import('./views/Profile.vue');
const Sell = () => import('./views/Sell.vue');

export default [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/profile',
    name: 'profile',
    component: Profile,
    meta: { requiresAuth: true },
  },
  {
    path: '/search',
    name: 'search',
    component: Search,
  },
  {
    path: '/sell',
    name: 'sell',
    component: Sell,
    meta: { requiresAuth: true },
  },
];
