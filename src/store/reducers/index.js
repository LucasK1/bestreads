import { combineReducers } from 'redux';
import booksReducer from './booksReducer';
import authReducer from './authReducer';

const rootReducer = combineReducers({
  books: booksReducer,
  auth: authReducer,
});

export default rootReducer;
