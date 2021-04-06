import axios from 'axios';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

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

export const authenticate = createAsyncThunk(
  'auth/authenticate',
  async (args: { email: string; password: string; isSignup: boolean }) => {
    const signupData: SignupData = {
      email: args.email,
      password: args.password,
      returnSecureToken: true,
    };

    const url = `https://identitytoolkit.googleapis.com/v1/accounts:${
      args.isSignup ? 'signUp' : 'signInWithPassword'
    }?key=${process.env.REACT_APP_API_KEY}`;

    const { data } = await axios.post(url, signupData);

    return data;
  }
);

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
  extraReducers: {
    [authenticate.pending.type]: (state, action) => ({
      ...state,
      error: null,
      loading: true,
    }),
    [authenticate.fulfilled.type]: (
      state,
      {
        payload,
      }: PayloadAction<{ idToken: string; userId: string; expiresIn: number }>
    ) => {
      const expirationDate = new Date(
        new Date().getTime() + payload.expiresIn * 1000
      );

      localStorage.setItem('idToken', payload.idToken);
      localStorage.setItem('userId', payload.userId);
      localStorage.setItem('expirationDate', expirationDate.toString());

      fetchBooksOnShelf(payload.idToken, payload.userId);
      checkAuthTimeout(payload.expiresIn);
      return {
        ...state,
        error: null,
        loading: false,
        idToken: payload.idToken,
        userId: payload.userId,
      };
    },
    [authenticate.rejected.type]: (state, { error }: any) => ({
      ...state,
      error: error,
      loading: false,
    }),
  },
});

export const checkAuthTimeout = (expirationTime: number) => (
  dispatch: AppDispatch
) => {
  setTimeout(() => {
    dispatch(logout());
  }, expirationTime * 1000);
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

const { actions, reducer } = authSlice;

export const {
  start: authStart,
  success: authSuccess,
  fail: authFail,
  logout,
} = actions;

export default reducer;
