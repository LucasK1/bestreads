import { axiosUserBooks } from 'axiosInstances';
import * as types from './types';

export const setFetchedBooks = (fetchedBooks) => {
  return { type: types.SET_FETCHED_BOOKS, fetchedBooks: fetchedBooks };
};

export const setUserShelf = (shelf) => {
  return { type: types.SET_USER_SHELF, shelf: shelf };
};

export const deleteBookFromShelf = (id) => {
  return { type: types.DELETE_BOOK_FROM_SHELF, id: id };
};

export const fetchBooksOnShelf = (idToken) => (dispatch) => {
  axiosUserBooks
    .get(`/books.json?auth=${idToken}`)
    .then(({ data }) => {
      console.log(data, 'Dane');
      const dataValues = Object.values(data);
      const dataKeys = Object.keys(data);
      const modifiedData = dataValues.map((item, index) => {
        return { ...item, firebaseId: dataKeys[index] };
      });
      dispatch(setUserShelf(modifiedData));
    })
    .catch(console.error);
};

export const updateRemoteShelf = (book, idToken) => (dispatch) => {
  axiosUserBooks
    .post(`/books.json?auth=${idToken}`, book)
    .then(() => dispatch(fetchBooksOnShelf(idToken)))
    .catch(console.error());
};
