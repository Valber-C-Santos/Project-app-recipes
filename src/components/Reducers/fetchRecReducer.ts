import { AnyAction } from 'redux';
import {
  FETCH_RECF_REQUEST,
  FETCH_RECF_SUCCESS,
  FETCH_RECF_ERROR,
  // FETCH_RECD_REQUEST,
  FETCH_RECD_SUCCESS,
  // FETCH_RECD_ERROR,
} from '../../utils/type/Type';

const INITIAL_STATE = {
  loading: false,
  data: [],
};

const fetchRecReducer = (state = INITIAL_STATE, action:AnyAction) => {
  switch (action.type) {
    case FETCH_RECF_REQUEST: return {
      ...state,
      loading: true,
    };
    case FETCH_RECF_SUCCESS: return {
      ...state,
      loading: false,
      data: action.payload,
    };
    case FETCH_RECF_ERROR: return {
      ...state,
      loading: false,
    };
    // case FETCH_DRINKS_REQUEST: return { // caso repetido
    //   ...state,
    //   loading: true,
    // };
    case FETCH_RECD_SUCCESS:
      return {
        ...state,
        data: action.payload,
      };
    // case FETCH_DRINKS_ERROR: // caso repetido
    //   return {
    //     ...state,
    //     loading: false,
    //   };
    default:
      return state;
  }
};

export default fetchRecReducer;
