import Vue from 'vue';
import Vuex, { Payload } from 'vuex';
import VuexPersistence from 'vuex-persist';

Vue.use(Vuex);
interface State {
  token: string;
  profile: object;
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
    profile: {},
  },
  mutations: {
    token: (state, payload) => {
      state.token = payload;
    },
    signout: (state) => {
      state.token = '';
    },
    profile: (state, payload) => {
      state.profile = payload;
    },
  },
  actions: {},
  getters: {
    loggedIn: (state) => {
      return state.token.length > 0;
    },
    profile: (state) => {
      return state.profile;
    },
    token: (state) => {
      return state.token;
    },
  },
  modules: {
    header: headerModule,
  },
  plugins: [vuexLocal.plugin],
});
