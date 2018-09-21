import axios, { AxiosPromise, AxiosResponse, AxiosError } from 'axios';
import store from '@/store';

import MockAdapter from 'axios-mock-adapter';
const mock = new MockAdapter(axios, { delayResponse: 200 });

const uri = {
  profile: '/api/me',
  campuses: '/api/campuses',
  users: '/api/users',
  accessToken: '/api/oauth/token',
  institutions: '/api/institutions',
};

mock.onGet(uri.profile).reply(200, {
  id: 1,
  names: 'Sduduzo Gumede',
  email: 'sdu@gum.com',
  number: '0812345678',
});

mock
  .onGet(uri.campuses)
  .reply(200, [
    {
      institutionId: 1,
      institutionName: 'University of Zululand',
      campuses: [
        {
          id: 1,
          name: 'KwaDlangezwa Campus',
        },
        {
          id: 2,
          name: 'Richards Bay Campus',
        },
      ],
    },
  ])
  .onPost(uri.campuses)
  .reply(200);

mock.onPost(uri.users).reply(201, {
  message: 'Created successfully',
});

mock.onPost(uri.accessToken).reply(200, {
  access_token:
    'a985d8d9e7e80643633b0b422c0c9f4a7892a88a8192fe2f0742d32455d450d8',
  token_type: 'bearer',
  expires_in: null,
});

mock
  .onPost(uri.institutions)
  .reply(200)
  .onGet(uri.institutions)
  .reply(200, [{ id: 1, name: 'University of Zululand', image: 'xxx' }]);

if (process.env.NODE_ENV === 'production') {
  mock.restore();
}

export const authUser = (username: string, password: string) => {
  return axios.post(uri.accessToken, {
    grant_type: 'password',
    username,
    password,
  });
};

export const createCampus = (institutionId: number, name: string) => {
  return axios.post(uri.campuses, {
    institutionId,
    name,
  });
};

export const createInstitution = (image: string, name: string) => {
  return axios.post(uri.institutions, { image, name });
};

export const createUser = (names: string, email: string, password: string) => {
  return axios.post(uri.users, { names, email, password });
};

export const getCampuses = () => {
  return axios.get(uri.campuses);
};

export const getInstitutions = () => {
  return axios.get(uri.institutions);
};

export const getProfile = (token: string) => {
  return axios.get(uri.profile, {
    params: {
      access_token: token,
    },
  });
};

export default {
  createUser,
  authUser,
  getProfile,
  getCampuses,
};
