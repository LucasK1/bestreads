export default (state, action) => {
  switch (action.type) {
    case 'SET_FETCHED_BOOKS':
      console.log(action.payload, 'dupa');
      return {
        ...state,
        fetchedBooks: action.payload,
      };
    case 'SET_USER_SHELF':
      return {
        ...state,
        userShelf: [...action.payload],
      };
    case 'DELETE_BOOK_FROM_SHELF':
      const newShelf = state.userShelf.filter(
        (book) => book.firebaseId !== action.payload
      );
      return {
        ...state,
        userShelf: [...newShelf],
      };
    default:
      return state;
  }
};
