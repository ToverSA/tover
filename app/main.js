import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from './components/Home.vue'
Vue.use(VueRouter);

const routes = [
  { path: '/', component: Home }
];

const router = new VueRouter({
  routes // short for `routes: routes`
});

const app = new Vue({
  router
}).$mount('#akomo');
