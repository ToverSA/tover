import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from "vuex-persistedstate";
import getters from "./getters";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    auth: false,
    count: 0,
    access_token: '',
    refresh_token: ''
  },
  getters,
  plugins: [createPersistedState({
    key: 'toverstate'
  })]
});
