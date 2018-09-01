import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from '@/store';
import './registerServiceWorker';

import AppLogo from '@/components/AppLogo.vue';

Vue.config.productionTip = false;

Vue.component('AppLogo', AppLogo);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
