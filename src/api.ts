import axios, { AxiosPromise } from 'axios';
import MockAdapter from 'axios-mock-adapter';

const mock = new MockAdapter(axios, { delayResponse: 500 });

mock.onGet('/users').reply(200);
mock.onPost('/api/users').reply(201, {
  message: 'Created successfully',
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
};
