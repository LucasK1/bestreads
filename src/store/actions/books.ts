import { AxiosError } from 'axios';
import { Dispatch } from 'redux';
import { axiosUserBooks } from '../../axiosInstances';
import { BookType } from '../../types/BookTypes';
import * as types from './types';

export const setFetchedBooks = (fetchedBooks: BookType[]): types.SetFetchedBooks => {
  return { type: types.SET_FETCHED_BOOKS, fetchedBooks: fetchedBooks };
};

export const setUserShelf = (shelf: any[]): types.SetUserShelf => {
  return { type: types.SET_USER_SHELF, shelf: shelf };
};

export const deleteBookFromShelf = (id: string): types.DeleteBookFromShelf => {
  return { type: types.DELETE_BOOK_FROM_SHELF, id: id };
};

export const fetchBooksOnShelf = (idToken: string) => (dispatch: Dispatch) => {
  axiosUserBooks
    .get(`/books.json?auth=${idToken}`)
    .then(({ data }) => {
      console.log(data, 'Dane');
      const dataValues: Object[] = Object.values(data);
      const dataKeys = Object.keys(data);
      const modifiedData: Object[] = dataValues.map(
        (item: {}, index: number) => {
          return { ...item, firebaseId: dataKeys[index] };
        }
      );
      dispatch(setUserShelf(modifiedData));
    })
    .catch(console.error);
};

export const updateRemoteShelf = (book: {}, idToken: string) => (
  dispatch: Dispatch
) => {
  axiosUserBooks
    .post(`/books.json?auth=${idToken}`, book)
    .then(() => dispatch<any>(fetchBooksOnShelf(idToken)))
    .catch((error: AxiosError) => console.error(error));
};
