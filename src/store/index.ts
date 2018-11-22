import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersistence from 'vuex-persist';
import adverts, { AdvertsState } from './adverts';
import auth, { AuthState } from './auth';
import insties, { InstiesState } from './insties';

Vue.use(Vuex);

export interface RootState {
  adverts: AdvertsState;
  auth: AuthState;
  insties: InstiesState;
}

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
  reducer: (state: RootState) => ({
    auth: {
      accessToken: state.auth.accessToken,
    },
    adverts: {
      post: state.adverts.post,
    },
  }),
});

const store = new Vuex.Store<RootState>({
  modules: {
    adverts,
    auth,
    insties,
  },
  plugins: [vuexLocal.plugin],
});

export default store;
