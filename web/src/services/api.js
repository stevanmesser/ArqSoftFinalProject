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

export default api;
