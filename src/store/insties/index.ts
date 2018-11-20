import api from '@/api';
import { RootState } from '..';
import { ActionContext, Store, Module } from 'vuex';
import { TokenType } from '../auth';
export interface Campus {
  id: number;
  name: string;
}
export interface Institution {
  id: number;
  name: string | null;
  imageData: string | null;
  campuses: Campus[];
}
export interface InstiesState {
  insties: Institution[];
  addingInstitution: boolean;
}

const instiesModule: Module<InstiesState, RootState> = {
  namespaced: true,
  state: {
    insties: [],
    addingInstitution: false,
  },
  actions: {
    addInstitution: async (
      context: ActionContext<InstiesState, RootState>,
      payload: Institution,
    ) => {
      try {
        context.commit('addingInstitution', true);
        const config = {
          headers: {
            Authorization:
              'Bearer ' +
              (context.rootGetters['auth/accessToken'] as TokenType).token,
          },
        };
        const response = await api.post('/api/institutions', payload, config);
        console.log(response);
      } catch (error) {
        console.log('my error', error);
      } finally {
        context.commit('addingInstitution', false);
      }
    },
  },
  mutations: {
    addingInstitution: (state: InstiesState, payload: boolean) => {
      state.addingInstitution = payload;
    },
    initAdd: (state: InstiesState) => {
      state.addingInstitution = false;
    },
  },
  getters: {
    addingInstitution: (state: InstiesState) => {
      return state.addingInstitution;
    },
  },
};

export default instiesModule;
