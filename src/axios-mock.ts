import axios, { AxiosPromise, AxiosResponse, AxiosError } from 'axios';
import MockAdapter from 'axios-mock-adapter';
const mock = new MockAdapter(axios, { delayResponse: 100 });

export const paths = {
  profile: '/api/me',
  campuses: '/api/campuses',
  users: '/api/users',
  accessToken: '/api/oauth/token',
  institutions: '/api/institutions',
};

export default function mockAxios() {
  mock.onGet(paths.profile).reply(200, {
    id: 1,
    names: 'Sduduzo Gumede',
    email: 'sdu@gum.com',
    number: '0812345678',
  });

  mock
    .onGet(paths.campuses)
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
    .onPost(paths.campuses)
    .reply(200);

  mock.onPost(paths.users).reply((config) => {
    return [201, 'Created successfully'];
  });

  mock.onPost(paths.accessToken).reply(200, {
    access_token:
      'a985d8d9e7e80643633b0b422c0c9f4a7892a88a8192fe2f0742d32455d450d8',
    token_type: 'bearer',
    expires_in: null,
  });

  mock
    .onPost(paths.institutions)
    .reply(200)
    .onGet(paths.institutions)
    .reply(200, [{ id: 1, name: 'University of Zululand', image: 'xxx' }]);
  return mock;
}
