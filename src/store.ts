import Vue from 'vue';
import Vuex, { Payload } from 'vuex';
import VuexPersistence from 'vuex-persist';

Vue.use(Vuex);
interface State {
  token: string;
}

interface HeaderState {
  menuOpened: boolean;
}

const vuexLocal = new VuexPersistence<State, Payload>({
  storage: window.localStorage,
  reducer: (state) => ({ token: state.token }),
});

const headerModule = {
  namespaced: true,
  state: {
    menuOpened: false,
  },
  mutations: {
    closeMenu: (state: HeaderState) => {
      state.menuOpened = false;
    },
    openMenu: (state: HeaderState) => {
      state.menuOpened = true;
    },
  },
};

export default new Vuex.Store<State>({
  state: {
    token: '',
  },
  mutations: {
    token: (state, payload) => {
      state.token = payload;
    },
    signout: (state) => {
      state.token = '';
    },
  },
  actions: {},
  getters: {
    loggedIn: (state) => {
      return state.token.length > 0;
    },
  },
  modules: {
    header: headerModule,
  },
  plugins: [vuexLocal.plugin],
});
