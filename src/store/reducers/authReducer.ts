import axios from 'axios';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AuthState } from 'types/StateTypes';
import { fetchBooksOnShelf } from './booksReducer';
import { AppDispatch } from 'store/store';

interface SignupData {
  email: string;
  password: string;
  returnSecureToken: boolean;
}

const initialState: AuthState = {
  idToken: null,
  userId: null,
  error: null,
  loading: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    start: (state) => ({
      ...state,
      error: null,
      loading: true,
    }),
    success: (
      state,
      { payload }: PayloadAction<{ idToken: string; userId: string }>
    ) => ({
      ...state,
      error: null,
      loading: false,
      idToken: payload.idToken,
      userId: payload.userId,
    }),
    fail: (state, { payload }: PayloadAction<{ error: Error }>) => ({
      ...state,
      error: payload.error,
      loading: false,
    }),
    logout: (state) => {
      localStorage.removeItem('idToken');
      localStorage.removeItem('userId');
      localStorage.removeItem('expirationDate');
      return { ...state, idToken: null, userId: null };
    },
  },
});

const { actions, reducer } = authSlice;
export const {
  start: authStart,
  success: authSuccess,
  fail: authFail,
  logout,
} = actions;

export const checkAuthTimeout = (expirationTime: number) => (
  dispatch: AppDispatch
) => {
  setTimeout(() => {
    dispatch(logout());
  }, expirationTime * 1000);
};

export const auth = (
  email: string,
  password: string,
  isSignup: boolean
) => async (dispatch: AppDispatch) => {
  dispatch(authStart());

  const signupData: SignupData = {
    email: email,
    password: password,
    returnSecureToken: true,
  };

  const url = `https://identitytoolkit.googleapis.com/v1/accounts:${
    isSignup ? 'signUp' : 'signInWithPassword'
  }?key=${process.env.REACT_APP_API_KEY}`;

  try {
    const {
      data: { idToken, localId, expiresIn },
    } = await axios.post(url, signupData);
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);

    localStorage.setItem('idToken', idToken);
    localStorage.setItem('userId', localId);
    localStorage.setItem('expirationDate', expirationDate.toString());

    dispatch(authSuccess({ idToken, userId: localId }));
    dispatch(fetchBooksOnShelf(idToken, localId));
    dispatch(checkAuthTimeout(expiresIn));
  } catch (err) {
    dispatch(authFail(err.response.data.error));
  }
};

export const authCheckState = () => (dispatch: AppDispatch) => {
  const idToken = localStorage.getItem('idToken');
  const userId = localStorage.getItem('userId');

  if (!idToken) {
    dispatch(logout());
  } else {
    const expirationTime = localStorage.getItem('expirationDate');
    let expiration;
    if (expirationTime) {
      expiration = new Date(expirationTime);
      if (!idToken || expiration < new Date()) {
        dispatch(logout());
      } else if (userId) {
        dispatch(authSuccess({ idToken, userId }));
      }
    }
  }
};

export default reducer;
