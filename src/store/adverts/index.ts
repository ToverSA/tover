import api from '@/api';
import { Module, ActionContext } from 'vuex';
import { RootState } from '..';
import { AxiosResponse } from 'axios';

export interface AdvertCategory {
  id: number;
  name: string;
}

export interface AdvertGroupCategory extends AdvertCategory {
  sub: AdvertCategory[] | undefined;
}

export interface Advert {
  id: number;
  title: string | null;
  price: string | null;
  description: string;
  category: AdvertCategory;
  images: string[];
}
export interface AdvertsState {
  post: Advert;
  categories: AdvertCategory[];
}

const adverts: Module<AdvertsState, RootState> = {
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
      },
      images: [],
    },
    categories: [],
  },
  actions: {
    listCategories: async (context: ActionContext<AdvertsState, RootState>) => {
      try {
        const response: AxiosResponse = await api.get('/api/posts/categories');
        context.commit('categories', response.data);
      } catch (error) {
        // TODO handle error
      }
    },
  },
  mutations: {
    categories: (state: AdvertsState, payload: AdvertCategory[]) => {
      state.categories = payload;
    },
    postTitle: (state: AdvertsState, payload: string | null) => {
      state.post.title = payload;
    },
    postImage: (state: AdvertsState, payload: string) => {
      state.post.images.push(payload);
    },
    postPrice: (state: AdvertsState, payload: string | null) => {
      state.post.price = payload;
    },
    postDescription: (state: AdvertsState, payload: string) => {
      state.post.description = payload;
    },
    removeImage: (state: AdvertsState, payload: number) => {
      state.post.images.splice(payload, 1);
    },
    chooseCategory: (state: AdvertsState, payload: AdvertCategory) => {
      state.post.category = payload;
    },
    changeCategory: (state: AdvertsState, payload: AdvertCategory) => {
      state.post.category = { id: 0, name: '' };
    },
    cancelPost: (state: AdvertsState) => {
      state.post.title = null;
      state.post.price = null;
      state.post.images = [];
      state.post.description = '';
      state.post.category.id = 0;
    },
  },
  getters: {
    post: (state: AdvertsState) => {
      return state.post;
    },
    postImages: (state: AdvertsState) => {
      return state.post.images;
    },
    listCategories: (state: AdvertsState) => {
      const list: AdvertCategory[] = [];
      state.categories.forEach((element) => {
        if ((element as AdvertGroupCategory).sub === undefined) {
          list.push(element);
        } else {
          (element as AdvertGroupCategory).sub!.forEach((elem) => {
            list.push(elem);
          });
        }
      });
      return list;
    },
  },
};

export default adverts;
