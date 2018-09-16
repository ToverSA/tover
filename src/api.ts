import axios, { AxiosPromise, AxiosResponse, AxiosError } from 'axios';

import MockAdapter from 'axios-mock-adapter';
if (process.env.NODE_ENV !== 'production') {
  const mock = new MockAdapter(axios, { delayResponse: 200 });

  mock
    .onGet('/api/me')
    .reply(200, {
      id: 1,
      names: 'Sduduzo Gumede',
      email: 'sdu@gum.com',
      number: '0812345678',
    })
    .onGet('/api/campuses')
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
    .onPost('/api/users')
    .reply(201, {
      message: 'Created successfully',
    })
    .onPost('/api/oauth/token')
    .reply(200, {
      access_token:
        'a985d8d9e7e80643633b0b422c0c9f4a7892a88a8192fe2f0742d32455d450d8',
      token_type: 'bearer',
      expires_in: null,
    });
}

export default {
  /**
   * Creates user sending a POST /api/users to server endpoint
   * @param string names of the user to create
   * @param string email of user
   * @param string password
   * @returns AxiosPromise
   */
  createUser(names: string, email: string, password: string): AxiosPromise {
    return axios.post('/api/users', { names, email, password });
  },
  /**
   * Authorises user and saves access_token in to state
   * @param string authEmail
   * @param string authPassword
   */
  authUser(authEmail: string, authPassword: string): AxiosPromise {
    return axios.post('api/oauth/token', {
      grant_type: 'password',
      username: authEmail,
      password: authPassword,
    });
    // TODO authorise user
  },
  getProfile(token: string): AxiosPromise {
    return axios.get('/api/me', {
      params: {
        access_token: token,
      },
    });
  },
  getCampuses(): AxiosPromise {
    return axios.get('/api/campuses');
  },
};
