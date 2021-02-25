import { AuthState } from 'types/StateTypes';
import * as types from '../actions/types';

const initialState: AuthState = {
  idToken: null,
  userId: null,
  error: null,
  loading: false,
};

const authStart = (state: AuthState, action: types.AuthStart) => {
  return { ...state, error: null, loading: true };
};

const authSuccess = (state: AuthState, action: types.AuthSuccess) => {
  return {
    ...state,
    idToken: action.idToken,
    userId: action.userId,
    error: null,
    loading: false,
  };
};

const authFail = (state: AuthState, action: types.AuthFail) => {
  return { ...state, error: action.error, loading: false };
};

const logout = (state: AuthState, action: types.AuthLogout) => {
  return { ...state, idToken: null, userId: null };
};
const reducer = (
  state: AuthState = initialState,
  action: types.AuthActionTypes
) => {
  switch (action.type) {
    case types.AUTH_START:
      return authStart(state, action);
    case types.AUTH_SUCCESS:
      return authSuccess(state, action);
    case types.AUTH_FAIL:
      return authFail(state, action);
    case types.AUTH_LOGOUT:
      return logout(state, action);
    default:
      return state;
  }
};

export default reducer;
