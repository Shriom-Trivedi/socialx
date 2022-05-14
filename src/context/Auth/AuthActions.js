export const LoginStart = (credentials) => ({
  // Credentials is an object with email and password
  type: LOGIN_START,
});

export const LoginSuccess = (user) => ({
  type: LOGIN_SUCCESS,
  payload: user,
});

export const LoginFailure = (error) => ({
  type: LOGIN_FAILURE,
  payload: error,
});
