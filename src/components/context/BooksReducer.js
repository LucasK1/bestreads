export default (state, action) => {
  switch (action.type) {
    case 'SET_FETCHED_BOOKS':
      console.log(action.payload, 'dupa')
      return {
        ...state,
        fetchedBooks: action.payload,
      };
    default:
      return state;
  }
};
