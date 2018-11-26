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
  savingInstitution: boolean;
}

const instiesModule: Module<InstiesState, RootState> = {
  namespaced: true,
  state: {
    insties: [],
    addingInstitution: false,
    savingInstitution: false,
  },
  actions: {
    addInstitution: async (
      context: ActionContext<InstiesState, RootState>,
      payload: Institution,
    ) => {
      try {
        context.commit('savingInstitution', true);
        const config = {
          headers: {
            Authorization:
              'Bearer ' +
              (context.rootGetters['auth/accessToken'] as TokenType).token,
          },
        };
        const response = await api.post('/api/institutions', payload, config);
      } catch (error) {
        // TODO handle error
      } finally {
        context.commit('savingInstitution', false);
      }
    },
    fetchInstitutions: async (
      context: ActionContext<InstiesState, RootState>,
    ) => {
      try {
        const response = await api.get('/api/institutions');
        context.commit('saveInsties', response.data);
      } catch (error) {
        // Do nothing yet
        if (context.state.insties.length === 0) {
          throw new Error('No institutions set yet');
        }
      }
    },
  },
  mutations: {
    addInstitution: (state: InstiesState) => {
      state.addingInstitution = true;
    },
    savingInstitution: (state: InstiesState, payload: boolean) => {
      state.addingInstitution = payload;
      if (!payload) {
        state.addingInstitution = payload;
      }
    },
    initAdd: (state: InstiesState) => {
      state.savingInstitution = false;
    },
    saveInsties: (state: InstiesState, payload: Institution[]) => {
      state.insties = payload;
    },
  },
  getters: {
    addingInstitution: (state: InstiesState) => {
      return state.addingInstitution;
    },
    institutions: (state: InstiesState) => {
      return state.insties;
    },
  },
};

export default instiesModule;
