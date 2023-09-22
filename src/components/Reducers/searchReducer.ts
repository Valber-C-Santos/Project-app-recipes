const initialState = {
  searchInput: '',
};

const searchReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case 'SET_SEARCH_INPUT':
      return { ...state, searchInput: action.payload };
    default:
      return state;
  }
};

export default searchReducer;
