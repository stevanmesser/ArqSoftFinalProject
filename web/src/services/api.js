import Axios from 'axios';
// import { getToken } from '../local/auth';

export const TOKEN_KEY = 'persistArqSoftFinalProject:Token';

const apisPorteds = [];

// const api = Axios.create({
//   baseURL: 'http://localhost:3333',
// });

// api.interceptors.request.use(async (config) => {
//   const token = localStorage.getItem(TOKEN_KEY);
//   if (token) config.headers.Authorization = `Bearer ${token}`;
//   return config;
// });

export default (port) => {
  const findApi = apisPorteds.find(({ port: actPort }) => actPort === port);

  if (findApi) {
    return findApi.api;
  }

  const api = Axios.create({
    baseURL: `http://localhost:${port}`,
  });

  api.interceptors.request.use(async (config) => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  });

  apisPorteds.push({ port, api });

  return api;
};
