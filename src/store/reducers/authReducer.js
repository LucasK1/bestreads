import * as types from '../actions/types';

const initialState = {
  idToken: null,
  userId: null,
  error: null,
  loading: false,
};

const authStart = (state, action) => {
  return { ...state, error: null, loading: true };
};

const authSuccess = (state, action) => {
  return {
    ...state,
    idToken: action.idToken,
    userId: action.userId,
    error: null,
    loading: false,
  };
};

const authFail = (state, action) => {
  return { ...state, error: action.error, loading: false };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.AUTH_START:
      return authStart(state, action);
    case types.AUTH_SUCCESS:
      return authSuccess(state, action);
    case types.AUTH_FAIL:
      return authFail(state, action);
    default:
      return state;
  }
};

export default reducer;
