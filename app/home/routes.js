import * as components from './components';

export default [
  {
    path: '/',
    component: components.Home,
    name: 'Home'
  },
  {
    path: '/store',
    component: components.Store,
    name: 'Store'
  },
  {
    path: '/store/:id',
    component: components.StoreItem,
    name: 'StoreItem'
  },
  {
    path: '/search',
    component: components.Search,
    name: 'Search'
  }
];
