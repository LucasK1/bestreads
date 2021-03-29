import booksReducer from './reducers/booksReducer';
import authReducer from './reducers/authReducer';

import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {
    books: booksReducer,
    auth: authReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
