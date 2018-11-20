import axios, { AxiosPromise, AxiosResponse, AxiosError } from 'axios';
import mockAxios from './axios-mock';

const instance = axios.create();

import MockAdapter from 'axios-mock-adapter';
const mock = new MockAdapter(instance, { delayResponse: 1000 });

mock.onPost('/api/institutions').reply((config) => {
  return [200, config.data];
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

if (process.env.NODE_ENV === 'production') {
  mock.restore();
}

export const paths = {
  profile: '/api/me',
  campuses: '/api/campuses',
  users: '/api/users',
  accessToken: '/api/oauth/token',
  institutions: '/api/institutions',
};

export const authUser = (username: string, password: string) => {
  return instance.post(paths.accessToken, {
    grant_type: 'password',
    username,
    password,
  });
};

export const createCampus = (institutionId: number, name: string) => {
  return axios.post(paths.campuses, {
    institutionId,
    name,
  });
};

export const createInstitution = (formData: FormData) => {
  return axios.post(paths.institutions, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const createUser = (names: string, email: string, password: string) => {
  return axios.post(paths.users, { names, email, password });
};

export const getCampuses = () => {
  return axios.get(paths.campuses);
};

export const getInstitutions = () => {
  return axios.get(paths.institutions);
};

export const getProfile = (token: string) => {
  return axios.get(paths.profile, {
    params: {
      access_token: token,
    },
  });
};

export default instance;
