import { PERSONAGE_LS } from './user';

export const TOKEN_KEY = 'persistArqSoftFinalProject:Token';

export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;
export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const login = (token) => {
  localStorage.setItem(TOKEN_KEY, token);
};
export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(PERSONAGE_LS);
};
