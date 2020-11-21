import Axios from 'axios';

export const TOKEN_KEY = 'persistArqSoftFinalProject:Token';

const apisPorteds = [];

export default (port) => {
  const findApi = apisPorteds.find(({ port: actPort }) => actPort === port);

  if (findApi) {
    return findApi.api;
  }

  const api = Axios.create({
    baseURL: process.env.REACT_APP_URL + (port && `:${port}`),
  });

  api.interceptors.request.use(async (config) => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  });

  apisPorteds.push({ port, api });

  return api;
};
