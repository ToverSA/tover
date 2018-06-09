import * as components from './components';

export default [
  {
    path: '/',
    component: components.Home,
    name: 'Home'
  },
  {
    path: '/books',
    component: components.Market,
    name: 'Books'
  },
  {
    path: '/electronics',
    component: components.Market,
    name: 'Electronics'
  },
  {
    path: '/services',
    component: components.Market,
    name: 'Services'
  },
  {
    path: '/events',
    component: components.Events,
    name: 'Events'
  },
  {
    path: '/search',
    component: components.Search,
    name: 'Search'
  }
];
