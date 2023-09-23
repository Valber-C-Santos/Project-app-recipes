import { AnyAction } from 'redux';
import {
  FETCH_FOOD_REQUEST,
  FETCH_FOOD_SUCCESS,
  FETCH_FOOD_ERROR,
  FETCH_DRINKS_REQUEST,
  FETCH_DRINKS_SUCCESS,
  FETCH_DRINKS_ERROR,
} from '../../type/Type';

const INITIAL_STATE = {
  loading: false,
  data: [],
};

const fetchAPIReducer = (state = INITIAL_STATE, action:AnyAction) => {
  switch (action.type) {
    case FETCH_FOOD_REQUEST: return {
      ...state,
      loading: true,
    };
    case FETCH_FOOD_SUCCESS: return {
      ...state,
      loading: false,
      data: action.payload,
    };
    case FETCH_FOOD_ERROR: return {
      ...state,
      loading: false,
    };
    // case FETCH_DRINKS_REQUEST: return {
    //   ...state,
    //   loading: true,
    // };
    case FETCH_DRINKS_SUCCESS:
      return {
        ...state,
        data: action.payload,
      };
    // case FETCH_DRINKS_ERROR:
    //   return {
    //     ...state,
    //     loading: false,
    //   };
    default:
      return state;
  }
};

export default fetchAPIReducer;
