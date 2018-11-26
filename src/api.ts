import axios, { AxiosPromise, AxiosResponse, AxiosError } from 'axios';

const instance = axios.create();

import MockAdapter from 'axios-mock-adapter';
const mock = new MockAdapter(instance, { delayResponse: 200 });

mock.onPost('/api/institutions').reply((config) => {
  return [201, config.data];
});

mock.onGet('/api/institutions').reply((config) => {
  return [201, require('@/assets/insties')];
});

mock.onPost('/api/users').reply((config) => {
  return [200];
});

mock.onPost('/api/posts').reply((config) => {
  return [201];
});

mock.onPost('/api/oauth/token').reply((config) => {
  return [
    200,
    {
      access_token:
        'a985d8d9e7e80643633b0b422c0c9f4a7892a88a8192fe2f0742d32455d450d8',
      token_type: 'bearer',
      expires_in: null,
    },
  ];
});

mock.onGet('/api/posts/categories').reply((config) => {
  return [
    200,
    [
      {
        id: '1',
        name: 'Food & Beverage',
        group: {
          id: '1',
          name: 'Cafe\' products',
        },
      },
      {
        id: '2',
        name: 'Other products',
        group: {
          id: '1',
          name: 'Cafe\' products',
        },
      },
      {
        id: '3',
        name: 'Textbooks',
        group: {
          id: '2',
          name: 'Study materials',
        },
      },
      {
        id: '4',
        name: 'Study guides & notes',
        group: {
          id: '2',
          name: 'Study materials',
        },
      },
      {
        id: '5',
        name: 'Phones & laptops',
        group: {
          id: '3',
          name: 'Electronics & Gadgets',
        },
      },
      {
        id: '6',
        name: 'Accessories & appliances',
        group: {
          id: '3',
          name: 'Electronics & Gadgets',
        },
      },
      {
        id: '7',
        name: 'Accommodation',
        group: {
          id: '4',
          name: 'Services',
        },
      },
      {
        id: '8',
        name: 'Events',
        group: {
          id: '4',
          name: 'Services',
        },
      },
      {
        id: '9',
        name: 'Other services',
        group: {
          id: '4',
          name: 'Services',
        },
      },
    ],
  ];
});

if (process.env.NODE_ENV === 'production') {
  mock.restore();
}

export const createUser = (names: string, email: string, password: string) => {
  return instance.post('/api/users', { names, email, password });
};

export default instance;
