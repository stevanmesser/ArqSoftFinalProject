import api from '../services/api';

export const PERSONAGE_LS = 'persistArqSoftFinalProject:User';

export const getUserLS = () => JSON.parse(localStorage.getItem(PERSONAGE_LS));

export function setUserLS(user) {
  localStorage.setItem(PERSONAGE_LS, JSON.stringify(user));
}

export async function reloadUser(userId) {
  const user = getUserLS();
  const id = userId || (user && user.id);
  if (id) {
    try {
      const resUser = await api.get(`/users/${id}`);
      setUserLS(resUser.data);
    } catch (error) {
      console.log(error.error);
    }
  }
}
