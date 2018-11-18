import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersistence from 'vuex-persist';
import Cookies from 'js-cookie';
import { IGlobalState as State } from '@/types';
import auth from './modules/auth';
import mutations from './mutations';
import actions from './actions';
import getters from './getters';

Vue.use(Vuex);

const vuexCookie = new VuexPersistence({
  restoreState: (key, storage) => Cookies.getJSON(key),
  saveState: (key, state, storage) =>
    Cookies.set(key, state, {
      expires: 30,
    }),
  modules: ['auth'],
  filter: (mutation) =>
    mutation.type === 'auth/signin' || mutation.type === 'auth/signout',
});

const store = new Vuex.Store<State>({
  state: {},
  mutations,
  actions,
  getters,
  modules: {
    auth,
  },
  plugins: [vuexCookie.plugin],
});

export default store;
