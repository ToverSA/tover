import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersistence from 'vuex-persist';
import posts, { PostsState } from './posts';
import auth, { AuthState } from './auth';
import insties, { InstiesState } from './insties';

Vue.use(Vuex);

export interface RootState {
  posts: PostsState;
  auth: AuthState;
  insties: InstiesState;
}

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
  reducer: (state: RootState) => ({
    auth: {
      accessToken: state.auth.accessToken,
    },
    posts: {
      post: state.posts.post,
    },
    insties: {
      insties: state.insties.insties,
    },
  }),
});

const store = new Vuex.Store<RootState>({
  modules: {
    posts,
    auth,
    insties,
  },
  plugins: [vuexLocal.plugin],
});

export default store;
