import Vue from 'vue';
import Vuex, { Payload } from 'vuex';
import VuexPersistence from 'vuex-persist';

Vue.use(Vuex);
interface State {
  token: string;
  profile: object;
}

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
  reducer: (state: State) => ({ token: state.token }),
});

const store = new Vuex.Store<State>({
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
  plugins: [vuexLocal.plugin],
});

export default store;
