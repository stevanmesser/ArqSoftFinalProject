import Axios from 'axios';
// import { getToken } from '../local/auth';

export const TOKEN_KEY = 'persistArqSoftFinalProject:Token';

const api = Axios.create({
  baseURL: 'http://localhost:3333',
});

api.interceptors.request.use(async (config) => {
  const token = localStorage.getItem(TOKEN_KEY);
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

const api4 = Axios.create({
  baseURL: 'http://localhost:3334',
});

api4.interceptors.request.use(async (config) => {
  const token = localStorage.getItem(TOKEN_KEY);
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

const api5 = Axios.create({
  baseURL: 'http://localhost:3335',
});

api5.interceptors.request.use(async (config) => {
  const token = localStorage.getItem(TOKEN_KEY);
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export { api4, api5 };

export default api;
