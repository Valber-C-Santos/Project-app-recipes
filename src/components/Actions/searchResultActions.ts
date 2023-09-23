import { MealsType } from '../../type/Type';

export const setSearchResults = (results:MealsType) => ({
  type: 'SET_SEARCH_RESULTS',
  payload: results,
});
