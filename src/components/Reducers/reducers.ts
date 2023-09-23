import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import searchReducer from './searchReducer';

export const rootReducer = combineReducers({
  search: searchReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));

export type RootState = ReturnType<typeof rootReducer>;
