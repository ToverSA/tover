import api from '@/api';
import { RootState } from '..';
import { ActionContext } from 'vuex';
import { TokenType } from '../auth';
export interface Campus {
  id: number;
  name: string;
}
export interface Institution {
  id: number;
  name: string;
  imageData: string;
  campuses: Campus[];
}
export interface InstiesState {
  insties: Institution[];
}

const instiesModule = {
  namespaced: true,
  state: {
    insties: [],
  },
  actions: {
    addInstitution: async (
      context: ActionContext<InstiesState, RootState>,
      payload: Institution,
    ) => {
      try {
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
      }
    },
  },
};

export default instiesModule;
