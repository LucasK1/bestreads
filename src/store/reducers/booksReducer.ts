import { BookState } from '../../types/StateTypes';
import * as types from '../actions/types';

export interface BookAction {
  type: string;
  fetchedBooks?: any[];
  shelf?: any[];
  id?: string;
}

const initialState: BookState = {
  fetchedBooks: [],
  userShelf: [],
};

const setFetchedBooks = (state: BookState, action: types.SetFetchedBooks) => {
  return {
    ...state,
    fetchedBooks: action.fetchedBooks,
  };
};

const setUserShelf = (state: BookState, action: types.SetUserShelf) => {
  return {
    ...state,
    userShelf: [...action.shelf],
  };
};

const deleteBookFromShelf = (
  state: BookState,
  action: types.DeleteBookFromShelf
) => {
  const newShelf = state.userShelf.filter(
    (book) => book.firebaseId !== action.id
  );
  return {
    ...state,
    userShelf: [...newShelf],
  };
};

const reducer = (
  state: BookState = initialState,
  action: types.ActionTypes
): BookState => {
  switch (action.type) {
    case types.SET_FETCHED_BOOKS:
      return setFetchedBooks(state, action);
    case types.SET_USER_SHELF:
      return setUserShelf(state, action);
    case types.DELETE_BOOK_FROM_SHELF:
      return deleteBookFromShelf(state, action);
    default:
      return state;
  }
};

export default reducer;
