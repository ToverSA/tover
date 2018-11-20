import api from '@/api';
import { ActionContext } from 'vuex';
import { RootState } from '..';
import { AxiosResponse } from 'axios';

export interface TokenType {
  token_type: string;
  expires_in: string | null;
  token: string;
}
export interface AuthState {
  accessToken: TokenType | null;
  authenticating: boolean;
}
export interface UserAuth {
  username: string;
  password: string;
  grant_type: string;
}

const authModule = {
  namespaced: true,
  state: {
    accessToken: null,
    authorising: false,
  },
  mutations: {
    signin: (state: AuthState, payload: TokenType) => {
      state.accessToken = payload;
    },
    signout: (state: AuthState) => {
      state.accessToken = null;
    },
    authenticating: (state: AuthState, payload: boolean) => {
      state.authenticating = payload;
    },
  },
  actions: {
    authenticate: async (
      context: ActionContext<AuthState, RootState>,
      payload: UserAuth,
    ) => {
      try {
        context.commit('authenticating', true);
        const response = (await api.post(
          '/api/oauth/token',
          payload,
        )) as AxiosResponse;
        const token: TokenType = {
          token: response.data.access_token,
          expires_in: response.data.expires_in,
          token_type: response.data.token_type,
        };
        context.commit('signin', token);
      } catch (error) {
        console.log(error);
        // TODO handle auth error here
      } finally {
        context.commit('authenticating', false);
      }
    },
  },
  getters: {
    loggedIn: (state: AuthState) => {
      return state.accessToken !== null;
    },
    authenticating: (state: AuthState) => {
      return state.authenticating;
    },
    accessToken: (state: AuthState) => {
      return state.accessToken!;
    },
  },
};

export default authModule;
