import api from '../services/api';

export const USER_LS = 'persistArqSoftFinalProject:User';

export const getUserLS = () => JSON.parse(localStorage.getItem(USER_LS));

export function setUserLS(user) {
  localStorage.setItem(USER_LS, JSON.stringify(user));
}

export async function reloadUser(userId) {
  try {
    const response = (
      await api(process.env.REACT_APP_USER_URL).get('/users/own')
    ).data;
    setUserLS(response);
  } catch (error) {
    console.error(`reload: ${error}`);
  }
}
