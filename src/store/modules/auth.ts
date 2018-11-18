import { IAuthState as State } from '@/types';
export default {
  namespaced: true,
  state: {
    accessToken: undefined,
  },
  mutations: {
    signin: (state: State, payload: string) => {
      state.accessToken = payload;
    },
    signout: (state: State) => {
      state.accessToken = undefined;
    },
  },
  actions: {},
  getters: {
    loggedIn: (state: State) => {
      return typeof state.accessToken === 'string';
    },
  },
};
