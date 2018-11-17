import { IState as State } from '@/types';
export default {
  loggedIn: (state: State) => {
    return state.token.length > 0;
  },
  profile: (state: State) => {
    return state.profile;
  },
  token: (state: State) => {
    return state.token;
  },
};
