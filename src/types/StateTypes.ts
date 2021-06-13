import { BookType, ShelfBookType } from "./BookTypes";

export interface BookState {
  fetchedBooks: BookType[];
  userShelf: ShelfBookType[];
}

export interface AuthState {
  idToken: string | null;
  userId: string | null;
  error: Error | null;
  loading: boolean;
}

export interface RootState {
  auth: AuthState;
  books: BookState;
}
