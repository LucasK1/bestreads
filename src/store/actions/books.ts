import { Dispatch } from 'redux';
import { axiosUserBooks } from '../../axiosInstances';
import { BookType } from '../../types/BookTypes';
import * as types from './types';

export const setFetchedBooks = (
  fetchedBooks: BookType[]
): types.SetFetchedBooks => {
  return { type: types.SET_FETCHED_BOOKS, fetchedBooks: fetchedBooks };
};

export const setUserShelf = (shelf: any[]): types.SetUserShelf => {
  return { type: types.SET_USER_SHELF, shelf: shelf };
};

export const deleteBookFromShelf = (id: string): types.DeleteBookFromShelf => {
  return { type: types.DELETE_BOOK_FROM_SHELF, id: id };
};

export const fetchBooksOnShelf = (
  idToken: string | null,
  userId: string | null
) => (dispatch: Dispatch) => {
  userId &&
    axiosUserBooks
      .get(`/books.json?auth=${idToken}&orderBy="userId"&equalTo="${userId}"`)
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

export const updateRemoteShelf = (
  book: BookType,
  idToken: string,
  userId: string | null,
  readState: string
) => (dispatch: Dispatch) => {
  const dataToSend = { ...book, userId: userId, readState: readState };
  axiosUserBooks
    .post(`/books.json?auth=${idToken}`, dataToSend)
    .then(() => dispatch<any>(fetchBooksOnShelf(idToken, userId)))
    .catch(console.error);
};
