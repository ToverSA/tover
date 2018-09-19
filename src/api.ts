import axios, { AxiosPromise, AxiosResponse, AxiosError } from 'axios';

import MockAdapter from 'axios-mock-adapter';

const uri = {
  profile: '/api/me',
  campuses: '/api/campuses',
  users: '/api/users',
  accessToken: '/api/oauth/token',
  institutions: '/api/institutions',
};

if (process.env.NODE_ENV !== 'production') {
  const mock = new MockAdapter(axios, { delayResponse: 200 });

  mock
    .onGet(uri.profile)
    .reply(200, {
      id: 1,
      names: 'Sduduzo Gumede',
      email: 'sdu@gum.com',
      number: '0812345678',
    })
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
    .onPost(uri.users)
    .reply(201, {
      message: 'Created successfully',
    })
    .onPost(uri.accessToken)
    .reply(200, {
      access_token:
        'a985d8d9e7e80643633b0b422c0c9f4a7892a88a8192fe2f0742d32455d450d8',
      token_type: 'bearer',
      expires_in: null,
    })
    .onPost(uri.institutions)
    .reply(200);
}

export const authUser = (username: string, password: string) => {
  return axios.post(uri.accessToken, {
    grant_type: 'password',
    username,
    password,
  });
};

export const createUser = (names: string, email: string, password: string) => {
  return axios.post(uri.users, { names, email, password });
};

export const createInstitution = () => {
  return axios.post(uri.institutions);
};

export const getCampuses = () => {
  return axios.get(uri.campuses);
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
