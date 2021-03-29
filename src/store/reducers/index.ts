import booksReducer from './booksReducer';
import authReducer from './authReducer';

const rootReducer = {
  books: booksReducer,
  auth: authReducer,
};

export default rootReducer;
