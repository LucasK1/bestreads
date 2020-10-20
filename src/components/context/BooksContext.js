import React, { useReducer, createContext } from 'react';
import BooksReducer from './BooksReducer';

export const initialState = {
  fetchedBooks: [],
};

export const BooksContext = createContext(initialState);

const BooksContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(BooksReducer, initialState);

  const setFetchedBooks = (fetchedBooks) => {
    dispatch({ type: 'SET_FETCHED_BOOKS', payload: fetchedBooks });
  };

  return (
    <BooksContext.Provider
      value={{ fetchedBooks: state.fetchedBooks, setFetchedBooks }}>
      {children}
    </BooksContext.Provider>
  );
};

export default BooksContextProvider;
