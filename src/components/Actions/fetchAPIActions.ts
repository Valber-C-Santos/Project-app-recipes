import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import { FETCH_DRINKS_ERROR, FETCH_DRINKS_REQUEST, FETCH_DRINKS_SUCCESS,
  FETCH_FOOD_ERROR, FETCH_FOOD_REQUEST,
  FETCH_FOOD_SUCCESS } from '../../utils/type/Type';
import { RootState, Dispatch } from '../Reducers/reducers';

const fetchFoodRequest = () => ({
  type: FETCH_FOOD_REQUEST,
});

const fetchFoodError = (error:any) => ({
  type: FETCH_FOOD_ERROR,
  error: error.message,
});

const fetchFoodSuccess = (food:any) => ({
  type: FETCH_FOOD_SUCCESS,
  payload: food,
});

const fetchDrinksRequest = () => ({
  type: FETCH_DRINKS_REQUEST,
});

const fetchDrinksError = (error:any) => ({
  type: FETCH_DRINKS_ERROR,
  error: error.message,
});

const fetchDrinksSuccess = (drinks:any) => ({
  type: FETCH_DRINKS_SUCCESS,
  payload: drinks,
});

type GetState = () => RootState;

// também pode usar :Dispatch, _getState:GetState

export const fetchFood = (type:string, search:string) => {
  return async (dispatch: Dispatch, _getState:GetState ) => {
    dispatch(fetchFoodRequest());
    try {
      let url;
      if (type === 's' || type === 'f') {
        url = `https://www.themealdb.com/api/json/v1/1/search.php?${type}=${search}`;
      } else {
        url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${search}`;
      }

      const response = await fetch(url);

      const data = await response.json();
      dispatch(fetchFoodSuccess(data));
    } catch (error) {
      dispatch(fetchFoodError(error));
    }
  };
};

export const fetchDrinks = (type:string, search:string) => {
  return async (dispatch:ThunkDispatch<RootState, null, Action<string>>) => {
    dispatch(fetchDrinksRequest());
    try {
      let url;
      if (type === 's' || type === 'f') {
        url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?${type}=${search}`;
      } else {
        url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${search}`;
      }

      const response = await fetch(url);

      const data = await response.json();
      dispatch(fetchDrinksSuccess(data));
    } catch (error) {
      dispatch(fetchDrinksError(error));
    }
  };
};
