import Vue from 'vue';
import Vuex from 'vuex';
// import VuexPersistence from 'vuex-persist';

// const vuexLocal = new VuexPersistence({
//   storage: window.localStorage,
// });

Vue.use(Vuex);

export default new Vuex.Store({
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
  actions: {

  },
  getters: {
    loggedIn: (state) => {
      return state.token.length > 0;
    },
  },
  // plugins: [vuexLocal.plugin],
});
