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
        userShelf: [...state.userShelf, action.payload],
      };
    default:
      return state;
  }
};
