import React, { useReducer, createContext } from 'react';
import BooksReducer from './BooksReducer';

export const initialState = {
  fetchedBooks: [],
  userShelf: [],
};

export const BooksContext = createContext(initialState);

const BooksContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(BooksReducer, initialState);

  const setFetchedBooks = (fetchedBooks) => {
    dispatch({ type: 'SET_FETCHED_BOOKS', payload: fetchedBooks });
  };

  const setUserShelf = (book) => {
    dispatch({ type: 'SET_USER_SHELF', payload: book });
  };
  const deleteBookFromShelf = (id) => {
    dispatch({ type: 'DELETE_BOOK_FROM_SHELF', payload: id });
  };

  return (
    <BooksContext.Provider
      value={{
        fetchedBooks: state.fetchedBooks,
        userShelf: state.userShelf,
        setFetchedBooks,
        setUserShelf,
        deleteBookFromShelf,
      }}>
      {children}
    </BooksContext.Provider>
  );
};

export default BooksContextProvider;
