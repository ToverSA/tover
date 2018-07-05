import Vue from "vue";
import Vuex from "vuex";
// import createPersistedState from "vuex-persistedstate";
import getters from "./getters";
import mutations from "./mutations";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    auth: false,
    count: 0,
    campusId: -1,
    access_token: "",
    refresh_token: ""
  },
  getters,
  mutations
  // plugins: [createPersistedState({
  //   key: 'toverstate'
  // })]
});
