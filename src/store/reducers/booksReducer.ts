import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit';
import { axiosUserBooks } from 'axiosInstances';
import { BookType, ShelfBookType } from 'types/BookTypes';
import { BookState } from '../../types/StateTypes';

const initialState: BookState = {
  fetchedBooks: [],
  userShelf: [],
};

const booksSlice = createSlice({
  name: 'books',
  initialState: initialState,
  reducers: {
    setFetchedBooks: (
      state,
      { payload }: PayloadAction<{ fetchedBooks: BookType[] }>
    ) => ({ ...state, fetchedBooks: payload.fetchedBooks }),
    setUserShelf: (
      state,
      { payload }: PayloadAction<{ shelf: ShelfBookType[] }>
    ) => ({ ...state, userShelf: [...payload.shelf] }),
    deleteBookFromShelf: (
      state,
      { payload }: PayloadAction<{ id: string }>
    ) => {
      const newShelf = state.userShelf.filter(
        (book) => book.firebaseId !== payload.id
      );
      return { ...state, userShelf: newShelf };
    },
  },
});

const { actions, reducer } = booksSlice;
export const { setUserShelf, deleteBookFromShelf, setFetchedBooks } = actions;

export const fetchBooksOnShelf = (idToken: string, userId: string) => async (
  dispatch: Dispatch
) => {
  try {
    const { data } = await axiosUserBooks.get(
      `/books.json?auth=${idToken}&orderBy="userId"&equalTo="${userId}"`
    );

    console.log(data, 'Dane');

    const dataValues: Object[] = Object.values(data);
    const dataKeys = Object.keys(data);
    const modifiedData: ShelfBookType[] = dataValues.map(
      (item: any, index: number) => {
        return { ...item, firebaseId: dataKeys[index] };
      }
    );
    dispatch(setUserShelf({ shelf: modifiedData }));
  } catch (err) {
    console.error(err);
  }
};

export const updateRemoteShelf = (
  book: BookType,
  idToken: string,
  userId: string,
  readState: string
) => async (dispatch: Dispatch) => {
  const dataToSend = { ...book, userId: userId, readState: readState };
  try {
    await axiosUserBooks.post(`/books.json?auth=${idToken}`, dataToSend);
    dispatch<any>(fetchBooksOnShelf(idToken, userId));
  } catch (err) {
    console.error(err);
  }
};

export default reducer;
