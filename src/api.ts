import axios, { AxiosPromise, AxiosResponse, AxiosError } from 'axios';
import MockAdapter from 'axios-mock-adapter';

const mock = new MockAdapter(axios, { delayResponse: 500 });

mock.onPost('/api/users').reply(201, {
  message: 'Created successfully',
}).onPost('/api/oauth/token').reply(200, {
  access_token: 'a985d8d9e7e80643633b0b422c0c9f4a7892a88a8192fe2f0742d32455d450d8',
  token_type: 'bearer',
  expires_in: null,
});

if (process.env.NODE_ENV === 'production') {
  mock.restore();
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
};
