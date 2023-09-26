import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import searchReducer from './searchReducer';
import searchResultReducer from './searchResultReducer';

export const rootReducer = combineReducers({
  search: searchReducer,
  searchResults: searchResultReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));

export type RootState = ReturnType<typeof rootReducer>;
