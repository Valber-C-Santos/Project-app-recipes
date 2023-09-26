import { AnyAction } from 'redux';
import { FETCH_DETAILS_REQUEST,
  FETCH_DETAILS_SUCCESS, FETCH_DETAILS_ERROR } from '../../utils/type/Type';

const INITIAL_STATE = {
  loading: false,
  data: [],
};
const fetchDetailsReducer = (state = INITIAL_STATE, action:AnyAction) => {
  switch (action.type) {
    case FETCH_DETAILS_REQUEST: return {
      ...state,
      loading: true,
    };
    case FETCH_DETAILS_SUCCESS: return {
      ...state,
      loading: false,
      data: action.payload,
    };
    case FETCH_DETAILS_ERROR: return {
      ...state,
      loading: false,
    };
    default:
      return {
        ...state,
      };
  }
};

export default fetchDetailsReducer;
