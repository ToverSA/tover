import api from '@/api';
import { Module, ActionContext } from 'vuex';
import { RootState } from '..';
import { AxiosResponse } from 'axios';

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
export interface PostsState {
  post: Post;
  categories: PostCategory[];
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
    post: async (context: ActionContext<PostsState, RootState>) => {
      try {
        // Do nothing
      } catch (error) {
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
    cancelPost: (state: PostsState) => {
      state.post.title = null;
      state.post.price = null;
      state.post.images = [];
      state.post.description = '';
      state.post.category.id = 0;
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
  },
};

export default posts;
