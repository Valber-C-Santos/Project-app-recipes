import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import { FETCH_RECD_ERROR, FETCH_RECD_REQUEST, FETCH_RECD_SUCCESS,
  FETCH_RECF_ERROR, FETCH_RECF_REQUEST,
  FETCH_RECF_SUCCESS } from '../../utils/type/Type';
import { RootState, Dispatch } from '../Reducers/reducers';

const fetchRecFoodRequest = () => ({
  type: FETCH_RECF_REQUEST,
});

const fetchRecFoodError = (error:any) => ({
  type: FETCH_RECF_ERROR,
  error: error.message,
});

const fetchRecFoodSuccess = (food:any) => ({
  type: FETCH_RECF_SUCCESS,
  payload: food,
});

const fetchRecDrinksRequest = () => ({
  type: FETCH_RECD_REQUEST,
});

const fetchRecDrinksError = (error:any) => ({
  type: FETCH_RECD_ERROR,
  error: error.message,
});

const fetchRecDrinksSuccess = (drinks:any) => ({
  type: FETCH_RECD_SUCCESS,
  payload: drinks,
});

type GetState = () => RootState;

// também pode usar :Dispatch, _getState:GetState

export const fetchRecFood = () => {
  return async (dispatch: Dispatch, _getState:GetState) => {
    dispatch(fetchRecFoodRequest());
    try {
      const url = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';

      const response = await fetch(url);

      const data = await response.json();
      dispatch(fetchRecFoodSuccess(data));
    } catch (error) {
      dispatch(fetchRecFoodError(error));
    }
  };
};

export const fetchRecDrinks = () => {
  return async (dispatch:ThunkDispatch<RootState, null, Action<string>>) => {
    dispatch(fetchRecDrinksRequest());
    try {
      const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

      const response = await fetch(url);

      const data = await response.json();
      dispatch(fetchRecDrinksSuccess(data));
    } catch (error) {
      dispatch(fetchRecDrinksError(error));
    }
  };
};
