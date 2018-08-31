import axios, { AxiosPromise } from 'axios';
import MockAdapter from 'axios-mock-adapter';

const mock = new MockAdapter(axios, { delayResponse: 500 });

mock.onGet('/users').reply(200);

export default {
  getUsers() {
    axios.get('users').then((response) => {
      console.log(response);
    });
  },
}
