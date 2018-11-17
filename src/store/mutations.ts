import { Payload } from 'vuex';
import { IState as State } from '@/types';

export default {
  token: (state: State, payload: string) => {
    state.token = payload;
  },
  signout: (state: any) => {
    state.token = '';
  },
  profile: (state: State, payload: object) => {
    state.profile = payload;
  },
};
