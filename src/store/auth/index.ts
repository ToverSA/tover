export interface AuthState {
  accessToken: string | undefined;
}

const authModule = {
  namespaced: true,
  state: {
    accessToken: undefined,
  },
  mutations: {
    signin: (state: AuthState, payload: string) => {
      state.accessToken = payload;
    },
    signout: (state: AuthState) => {
      state.accessToken = undefined;
    },
  },
  actions: {},
  getters: {
    loggedIn: (state: AuthState) => {
      return typeof state.accessToken === 'string';
    },
  },
};

export default authModule;
