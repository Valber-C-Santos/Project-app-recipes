import { composeWithDevTools } from '@redux-devtools/extension';
import { AnyAction, createStore, combineReducers, applyMiddleware } from 'redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import searchReducer from './searchReducer';
import searchResultReducer from './searchResultReducer';
import fetchAPIReducer from './fetchAPIReducer';
import removeFavoriteRecipesReducer from './favoriteRecipeReducer';

export const rootReducer = combineReducers({
  search: searchReducer,
  searchResults: searchResultReducer,
  fetchAPI: fetchAPIReducer,
  removeFavoriteRecipe: removeFavoriteRecipesReducer,
});

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk)),
);

export type RootState = ReturnType<typeof rootReducer>;

export type Dispatch = ThunkDispatch<RootState, null, AnyAction>;
