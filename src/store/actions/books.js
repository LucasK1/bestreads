// import { useCallback } from 'react';
import * as actionTypes from './actionTypes';

export const setFetchedBooks = (fetchedBooks) => {
  return { type: actionTypes.SET_FETCHED_BOOKS, fetchedBooks: fetchedBooks };
};

export const setUserShelf = (book) => {
  return { type: actionTypes.SET_USER_SHELF, book: book };
};

export const deleteBookFromShelf = (id) => {
  return { type: actionTypes.DELETE_BOOK_FROM_SHELF, id: id };
};
