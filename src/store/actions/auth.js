import axios from 'axios';
import * as types from './types';
import * as actions from './index';

export const authStart = () => {
  return { type: types.AUTH_START };
};

export const authSuccess = (idToken, userId) => {
  return { type: types.AUTH_SUCCESS, idToken: idToken, userId: userId };
};

export const authFail = (error) => {
  return { type: types.AUTH_FAIL, error: error };
};

export const logout = () => {
  return {
    type: types.AUTH_LOGOUT,
  };
};

export const checkAuthTimeout = (expirationTime) => (dispatch) => {
  setTimeout(() => {
    dispatch(logout());
  }, expirationTime * 1000);
};

export const auth = (email, password, isSignup) => (dispatch) => {
  dispatch(authStart());
  const signupData = {
    email: email,
    password: password,
    returnSecureToken: true,
  };
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:${
    isSignup ? 'signUp' : 'signInWithPassword'
  }?key=${process.env.REACT_APP_API_KEY}`;
  axios
    .post(url, signupData)
    .then(({ data }) => {
      console.log(data);
      dispatch(authSuccess(data.idToken, data.localId));
      dispatch(actions.fetchBooksOnShelf(data.idToken));
      dispatch(checkAuthTimeout(data.expiresIn));
    })
    .catch((err) => {
      dispatch(authFail(err.response.data.error));
    });
};
