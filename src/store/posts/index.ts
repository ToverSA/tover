import api from '@/api';
import { Module, ActionContext } from 'vuex';
import { RootState } from '..';
import { AxiosResponse } from 'axios';
import { TokenType } from '../auth';

export interface CategoryGroup {
  id: number;
  name: string;
}

export interface PostCategory {
  id: number;
  name: string;
  group: CategoryGroup;
}

export interface Post {
  id: number;
  title: string | null;
  price: string | null;
  description: string;
  category: PostCategory;
  images: string[];
  owner: number;
}

export interface PostPublish extends Post {
  campus: number;
}

export interface PostsState {
  post: Post;
  categories: PostCategory[];
  choosingCampus: boolean;
}

const posts: Module<PostsState, RootState> = {
  namespaced: true,
  state: {
    post: {
      id: 0,
      title: null,
      description: '',
      price: null,
      category: {
        id: 0,
        name: '',
        group: {
          id: 0,
          name: '',
        },
      },
      images: [],
      owner: 0,
    },
    choosingCampus: false,
    categories: [],
  },
  actions: {
    listCategories: async (context: ActionContext<PostsState, RootState>) => {
      try {
        const response: AxiosResponse = await api.get('/api/posts/categories');
        context.commit('categories', response.data);
      } catch (error) {
        // TODO handle error
      }
    },
    publishPost: async (
      context: ActionContext<PostsState, RootState>,
      payload: number,
    ) => {
      try {
        const config = {
          headers: {
            Authorization:
              'Bearer ' +
              (context.rootGetters['auth/accessToken'] as TokenType).token,
          },
        };
        const post = context.state.post as PostPublish;
        post.campus = payload;
        const response = await api.post('/api/posts', post, config);
        console.log(response);
      } catch (error) {
        console.log(error);
        // TODO handle error
      }
    },
  },
  mutations: {
    categories: (state: PostsState, payload: PostCategory[]) => {
      state.categories = payload;
    },
    postTitle: (state: PostsState, payload: string | null) => {
      state.post.title = payload;
    },
    postImage: (state: PostsState, payload: string) => {
      if (!state.post.images.includes(payload)) {
        state.post.images.push(payload);
      }
    },
    postPrice: (state: PostsState, payload: string | null) => {
      state.post.price = payload;
    },
    postDescription: (state: PostsState, payload: string) => {
      state.post.description = payload;
    },
    removeImage: (state: PostsState, payload: number) => {
      state.post.images.splice(payload, 1);
    },
    chooseCategory: (state: PostsState, payload: PostCategory) => {
      state.post.category = payload;
    },
    changeCategory: (state: PostsState, payload: PostCategory) => {
      state.post.category = { id: 0, name: '', group: { id: 0, name: '' } };
    },
    clearPost: (state: PostsState) => {
      state.post.title = null;
      state.post.price = null;
      state.post.images = [];
      state.post.description = '';
      state.post.category.id = 0;
      state.choosingCampus = false;
    },
    chooseCampus: (state: PostsState) => {
      state.choosingCampus = true;
    },
  },
  getters: {
    post: (state: PostsState) => {
      return state.post;
    },
    postImages: (state: PostsState) => {
      return state.post.images;
    },
    listCategories: (state: PostsState) => {
      const list: PostCategory[] = [];
      state.categories.forEach((element) => {
        list.push(element);
      });
      return list;
    },
    listCampuses: (state: PostsState) => {
      const list: PostCategory[] = [];
      return list;
    },
    choosingCampus: (state: PostsState) => {
      return state.choosingCampus;
    },
  },
};

export default posts;
