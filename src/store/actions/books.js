// import { useCallback } from 'react';
import * as types from './types';

export const setFetchedBooks = (fetchedBooks) => {
  return { type: types.SET_FETCHED_BOOKS, fetchedBooks: fetchedBooks };
};

export const setUserShelf = (book) => {
  return { type: types.SET_USER_SHELF, book: book };
};

export const deleteBookFromShelf = (id) => {
  return { type: types.DELETE_BOOK_FROM_SHELF, id: id };
};
