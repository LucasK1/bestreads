import axios from 'axios';
import * as types from './types';

export const authStart = () => {
  return { type: types.AUTH_START };
};

export const authSuccess = (idToken, userId) => {
  return { type: types.AUTH_SUCCESS, idToken: idToken, userId: userId };
};

export const authFail = (error) => {
  return { type: types.AUTH_FAIL, error: error };
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
  }?key=AIzaSyDEINgm_j68xaj2FBkXcnkFvhoTgALyXBc`;
  axios
    .post(url, signupData)
    .then(({ data }) => {
      console.log(data);
      dispatch(authSuccess(data.idToken, data.userId));
    })
    .catch((err) => {
      dispatch(authFail(err));
      console.error(err);
    });
};
