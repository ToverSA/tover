import Vue from 'vue';
import App from './App.vue';
import router from './router';
import './registerServiceWorker';

import VeeValidate from 'vee-validate';

Vue.use(VeeValidate, { inject: false });

import AppLogo from '@/components/AppLogo.vue';
import Icons from '@/components/Icons.vue';

Vue.config.productionTip = false;
Vue.component('AppLogo', AppLogo);
Vue.component('Icons', Icons);

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
