const INITIAL_STATE = {
  searchInput: '',
};

const searchReducer = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case 'SET_SEARCH_INPUT':
      return { ...state, searchInput: action.payload };
    default:
      return state;
  }
};

export default searchReducer;
