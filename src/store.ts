import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: '',
  },
  mutations: {
    token: (state, payload) => {
      state.token = payload;
    },
  },
  actions: {

  },
  getters: {
    loggedIn: (state) => {
      return state.token.length > 0;
    },
  },
});
