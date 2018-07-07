import Vue from "vue";
import Vuex from "vuex";
// import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);
var mock = true;
export default new Vuex.Store({
  state: {
    auth: false,
    campusId: -1,
    access_token: "",
    refresh_token: ""
  },
  getters: {
    loggedIn: state => {
      // TODO: Check if access token is valid, or available
      if (!mock) return state.auth;
      return true;
    },
    campusSet: state => {
      return state.campusId !== -1;
    }
  },
  mutations: {
    setAuth: state => {
      state.auth = true;
    },
    campusId: (state, id) => {
      state.campusId = id;
    }
  },
  actions: {}
  // plugins: [createPersistedState({
  //   key: 'toverstate'
  // })]
});
