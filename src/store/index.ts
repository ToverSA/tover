import Vue from 'vue';
import Vuex, { Payload } from 'vuex';
import VuexPersistence from 'vuex-persist';
import notifications from './modules/notifications';
import { IState as State } from '@/types';
import mutations from './mutations';
import actions from './actions';
import getters from './getters';

Vue.use(Vuex);

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
  reducer: (state: State) => ({ token: state.token }),
});

const store = new Vuex.Store<State>({
  state: {
    token: '',
    profile: {},
  },
  mutations,
  actions,
  getters,
  modules: {
    notifications,
  },
  plugins: [vuexLocal.plugin],
});

export default store;
