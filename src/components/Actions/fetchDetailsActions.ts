import { RootState, Dispatch } from '../Reducers/reducers';
import { FETCH_DETAILS_ERROR,
  FETCH_DETAILS_REQUEST, FETCH_DETAILS_SUCCESS } from '../../utils/type/Type';

const fetchDetailsRequest = () => ({
  type: FETCH_DETAILS_REQUEST,
});

const fetchDetailsError = (error:any) => ({
  type: FETCH_DETAILS_ERROR,
  error: error.message,
});

const fetchDetailsSuccess = (food:any) => ({
  type: FETCH_DETAILS_SUCCESS,
  payload: food,
});

type GetState = () => RootState;

export const fetchDetails = (type:string, id:string) => {
  return async (dispatch: Dispatch, _getState:GetState) => {
    dispatch(fetchDetailsRequest());
    try {
      let url = '';
      // console.log(type, id);
      if (type === 'meals') {
        url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
      }
      if (type === 'drinks') {
        url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
      }
      const response = await fetch(url);

      const data = await response.json();
      dispatch(fetchDetailsSuccess(data));
    } catch (error) {
      dispatch(fetchDetailsError(error));
    }
  };
};
