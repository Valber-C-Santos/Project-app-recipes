import { createStore, combineReducers } from 'redux';
import searchReducer from './searchReducer';

const rootReducer = combineReducers({
  search: searchReducer,
});

export const store = createStore(rootReducer);

export type RootState = ReturnType<typeof rootReducer>;
