import * as types from '../actions/types';

const initialState = {
  fetchedBooks: [],
  userShelf: [],
};

const setFetchedBooks = (state, action) => {
  return {
    ...state,
    fetchedBooks: action.fetchedBooks,
  };
};

const setUsetShelf = (state, action) => {
  return {
    ...state,
    userShelf: [...action.book],
  };
};

const deleteBookFromShelf = (state, action) => {
  const newShelf = state.userShelf.filter(
    (book) => book.firebaseId !== action.id
  );
  return {
    ...state,
    userShelf: [...newShelf],
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_FETCHED_BOOKS:
      return setFetchedBooks(state, action);
    case types.SET_USER_SHELF:
      return setUsetShelf(state, action);
    case types.DELETE_BOOK_FROM_SHELF:
      return deleteBookFromShelf(state, action);
    default:
      return state;
  }
};

export default reducer;
