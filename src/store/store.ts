import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./reducers/authReducer";
import booksReducer from "./reducers/booksReducer";

export const store = configureStore({
  reducer: {
    books: booksReducer,
    auth: authReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
