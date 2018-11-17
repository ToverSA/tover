import axios, { AxiosPromise, AxiosResponse, AxiosError } from 'axios';
import mockAxios from './axios-mock';

const mock = mockAxios();

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
  return axios.post(paths.accessToken, {
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

export const createInstitution = (image: Blob, name: string) => {
  const formData = new FormData();
  formData.append('name', name);
  formData.append('image', image);
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

export default {
  createUser,
  authUser,
  getProfile,
  getCampuses,
};
