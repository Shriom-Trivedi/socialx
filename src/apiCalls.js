import axios from 'axios';

export const loginCall = async (credentials, dispatch) => {
  dispatch({ type: 'LOGIN_START' });
  try {
    const res = await axios.post('auth/login', credentials);
    dispatch({ type: 'LOGIN_SUCCESS', payload: res.data });
    sessionStorage.setItem('user', JSON.stringify(res.data));
  } catch (error) {
    dispatch({ type: 'LOGIN_FAILURE', payload: error });
  }
};

export const refreshCall = async (user, dispatch) => {
  try {
    const res = await axios.post('auth/refresh', { token: user.refreshToken });
    const userData = {
      ...user,
      accessToken: res.data.accessToken,
      refreshToken: res.data.refreshToken,
    };
    dispatch({ type: 'REFRESH_SUCCESS', payload: userData });
    sessionStorage.setItem('user', JSON.stringify(userData));
    return {
      accessToken: res.data.accessToken,
      refreshToken: res.data.refreshToken,
    };
  } catch (err) {
    console.log(err);
    dispatch({ type: 'REFRESH_FAILURE', payload: err });
  }
};
