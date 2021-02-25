import { Dispatch } from 'redux';

import axios from 'axios';
import * as types from './types';
import * as actions from './index';

interface SignupData {
  email: string;
  password: string;
  returnSecureToken: boolean;
}

export const authStart = (): types.AuthStart => {
  return { type: types.AUTH_START };
};

export const authSuccess = (
  idToken: string,
  userId: string
): types.AuthSuccess => {
  return { type: types.AUTH_SUCCESS, idToken: idToken, userId: userId };
};

export const authFail = (error: Error): types.AuthFail => {
  return { type: types.AUTH_FAIL, error: error };
};

export const logout = (): types.AuthLogout => {
  localStorage.removeItem('idToken');
  localStorage.removeItem('userId');
  localStorage.removeItem('expirationDate');
  return {
    type: types.AUTH_LOGOUT,
  };
};

export const checkAuthTimeout = (expirationTime: number) => (
  dispatch: Dispatch
) => {
  setTimeout(() => {
    dispatch(logout());
  }, expirationTime * 1000);
};

export const auth = (email: string, password: string, isSignup: boolean) => (
  dispatch: Dispatch
) => {
  dispatch(authStart());
  const signupData: SignupData = {
    email: email,
    password: password,
    returnSecureToken: true,
  };
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:${
    isSignup ? 'signUp' : 'signInWithPassword'
  }?key=${process.env.REACT_APP_API_KEY}`;
  axios
    .post(url, signupData)
    .then(({ data: { idToken, localId, expiresIn } }) => {
      const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);

      localStorage.setItem('idToken', idToken);
      localStorage.setItem('userId', localId);
      localStorage.setItem('expirationDate', expirationDate.toString());

      dispatch(authSuccess(idToken, localId));
      dispatch<any>(actions.fetchBooksOnShelf(idToken, localId));
      dispatch<any>(checkAuthTimeout(expiresIn));
    })
    .catch((err) => {
      dispatch<any>(authFail(err!.response.data.error));
    });
};

export const authCheckState = () => (dispatch: Dispatch) => {
  const token = localStorage.getItem('idToken');
  const userId = localStorage.getItem('userId');
  if (!token) {
    dispatch(logout());
  } else {
    const expirationTime = localStorage.getItem('expirationDate');
    let expiration;
    if (expirationTime) {
      expiration = new Date(expirationTime);
      if (!token || expiration < new Date()) {
        dispatch(logout());
      } else if (userId) {
        dispatch(authSuccess(token, userId));
      }
    }
  }
};
