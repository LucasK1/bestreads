import { BookType, ShelfBookType } from '../../types/BookTypes';

export const SET_FETCHED_BOOKS = 'SET_FETCHED_BOOKS';
export const SET_USER_SHELF = 'SET_USER_SHELF';
export const DELETE_BOOK_FROM_SHELF = 'DELETE_BOOK_FROM_SHELF';

export const AUTH_START = 'AUTH_START';
export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const AUTH_FAIL = 'AUTH_FAIL';

export const AUTH_LOGOUT = 'AUTH_LOGOUT';


export interface SetFetchedBooks {
  type: typeof SET_FETCHED_BOOKS;
  fetchedBooks: BookType[];
}
export interface SetUserShelf {
  type: typeof SET_USER_SHELF;
  shelf: ShelfBookType[];
}
export interface DeleteBookFromShelf {
  type: typeof DELETE_BOOK_FROM_SHELF;
  id: string;
}
export interface AuthStart {
  type: typeof AUTH_START;
}
export interface AuthSuccess {
  type: typeof AUTH_SUCCESS;
  userId: string;
  idToken: string;
}
export interface AuthFail {
  type: typeof AUTH_FAIL;
  error: Error;
}
export interface AuthLogout {
  type: typeof AUTH_LOGOUT;
}

export type ActionTypes = SetFetchedBooks | SetUserShelf | DeleteBookFromShelf;

export type AuthActionTypes = AuthStart | AuthSuccess | AuthFail | AuthLogout;