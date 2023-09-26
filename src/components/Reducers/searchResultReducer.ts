const INITIAL_STATE = {
  searchResults: {
    meals: [],
    drinks: [],
  },

const searchResultReducer = (state = INITIAL_STATE, action:any) => {
  switch (action.type) {
    case 'SET_SEARCH_RESULTS':
      return {
        ...state,
        searchResults: action.payload,
      };
    default:
      return state;
  }
};

export default searchResultReducer;
