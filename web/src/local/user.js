import api from '../services/api';

export const USER_LS = 'persistArqSoftFinalProject:User';

export const getUserLS = () => JSON.parse(localStorage.getItem(USER_LS));

export function setUserLS(user) {
  localStorage.setItem(USER_LS, JSON.stringify(user));
}

export async function reloadUser(userId) {
  try {
    const resUser = await api.get('/users/own');
    console.log(resUser.data);
    setUserLS(resUser.data);
  } catch (error) {
    console.error(error.error);
  }
}
