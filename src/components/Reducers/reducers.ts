import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import searchReducer from './searchReducer';
import searchResultReducer from './searchResultReducer';
import fetchAPIReducer from './fetchAPIReducer';

export const rootReducer = combineReducers({
  search: searchReducer,
  searchResults: searchResultReducer,
  fetchAPI: fetchAPIReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));

export type RootState = ReturnType<typeof rootReducer>;
