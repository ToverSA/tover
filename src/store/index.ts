import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersistence from 'vuex-persist';
import auth, { AuthState } from './auth';
import insties, { InstiesState } from './insties';

Vue.use(Vuex);

export interface RootState {
  auth: AuthState;
  insties: InstiesState;
}

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
  reducer: (state: RootState) => ({ auth: state.auth }),
  filter: (mutation) =>
    mutation.type === 'auth/signin' || mutation.type === 'auth/signout',
});

const store = new Vuex.Store<RootState>({
  modules: {
    auth,
    insties,
  },
  plugins: [vuexLocal.plugin],
});

export default store;
