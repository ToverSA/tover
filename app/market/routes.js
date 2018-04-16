import * as components from './components';

export default [
  {
    path: '/market',
    component: components.MarketView,
    name: 'Market'
  },
  {
    path: '/markets/:id',
    component: components.MarketItemView,
    name: 'MarketItem'
  }
];
