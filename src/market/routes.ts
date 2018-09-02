import Home from './views/Home.vue';
import Search from './views/Search.vue';
import Sell from './views/Sell.vue';

export default [
  {
    path: '/',
    name: 'home',
    component: Home,
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
