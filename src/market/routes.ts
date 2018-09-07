const About = () => import(/* webpackChunkName: "v" */ './views/About.vue');
const Auth = () => import(/* webpackChunkName: "v" */ './views/Auth.vue');
const Item = () => import(/* webpackChunkName: "v" */ './views/Item.vue');
const Home = () => import(/* webpackChunkName: "v" */ './views/Home.vue');
const Profile = () => import(/* webpackChunkName: "v" */ './views/Profile.vue');
const Search = () => import(/* webpackChunkName: "v" */ './views/Search.vue');
const Sell = () => import(/* webpackChunkName: "v" */ './views/Sell.vue');
const Signup = () => import(/* webpackChunkName: "v" */ './views/Signup.vue');

const Summary = () =>
  import(/* webpackChunkName: "c" */ './components/Summary.vue');

export default [
  {
    path: '/about',
    name: 'about',
    component: About,
  },
  {
    path: '/auth',
    name: 'auth',
    component: Auth,
    meta: { requiresNoAuth: true },
  },
  {
    path: '/item/:id',
    name: 'item',
    component: Item,
  },
  {
    path: '/',
    component: Home,
    children: [
      {
        path: '',
        name: 'home',
        component: Summary,
      },
    ],
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
  {
    path: '/create-account',
    name: 'signup',
    component: Signup,
    meta: { requiresNoAuth: true },
  },
];
