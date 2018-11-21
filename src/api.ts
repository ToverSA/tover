import axios, { AxiosPromise, AxiosResponse, AxiosError } from 'axios';

const instance = axios.create();

import MockAdapter from 'axios-mock-adapter';
const mock = new MockAdapter(instance, { delayResponse: 1000 });

mock.onPost('/api/institutions').reply((config) => {
  return [200, config.data];
});

mock.onPost('/api/users').reply((config) => {
  return [200];
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
        id: 1,
        name: 'food & beverages',
      },
      {
        id: 2,
        name: 'books & study material',
      },
      {
        id: 1,
        name: 'electronics & gadgets',
        sub: [
          {
            id: 3,
            name: 'phones & laptops',
          },
          {
            id: 4,
            name: 'accessories & appliances',
          },
        ],
      },
      {
        id: 4,
        name: 'services & other',
        sub: [
          {
            id: 5,
            name: 'accommodation',
          },
          {
            id: 6,
            name: 'events',
          },
          {
            id: 7,
            name: 'other services',
          },
        ],
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
