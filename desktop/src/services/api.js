import Axios from 'axios';

export const TOKEN_KEY = 'persistArqSoftFinalProject:Token';

const apis = [];

export default (url) => {
  const findApi = apis.find((api) => api.url === url);

  if (findApi) {
    return findApi.api;
  }

  const api = Axios.create({
    baseURL: url,
  });

  api.interceptors.request.use(async (config) => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  });

  apis.push({ url, api });

  return api;
};
