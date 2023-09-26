import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { RecipeList } from './RecipeList';
import { fetchDrinks, fetchFood } from './Actions/fetchAPIActions';
import { Dispatch, RootState, store } from './Reducers/reducers';

function SearchBar() {
  const [searchType, setSearchType] = useState('i');
  const searchTerm = useSelector((state:RootState) => state.search.searchInput);
  const recipeList = useSelector((state:RootState) => state.fetchAPI);

  // console.log(recipeList);
  // console.log(recipeList);
  // console.log(searchType);

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch:Dispatch = useDispatch();

  useEffect(() => {
    console.log(recipeList.data);

    if (recipeList.data.meals && recipeList.data.meals.length === 1) {
      const mealID = recipeList.data.meals[0].idMeal;
      console.log('alo');

      navigate(`/meals/${mealID}`);
    }

    if (recipeList.data.drinks && recipeList.data.drinks.length === 1) {
      const drinksID = recipeList.data.drinks[0].idDrink;
      navigate(`/drinks/${drinksID}`);
    }

    if (recipeList.data.drinks === null || recipeList.data.meals === null) {
      window.alert("Sorry, we haven't found any recipes for these filters.");
    }
  }, [recipeList, navigate]);

  const handleSearch = async () => {
    // console.log(recipeList);
    if (searchType === 'f' && searchTerm.length > 1) {
      window.alert('Your search must have only 1 (one) character');
      return null;
    }
    console.log(location.pathname);
    if (location.pathname === '/meals') {
      // console.log('/meals dispatch');

      store.dispatch(fetchFood(searchType, searchTerm));
    }
    if (location.pathname === '/drinks') {
      // console.log('/drinks dispatch');

      dispatch(fetchDrinks(searchType, searchTerm));
    }

    // USANDO SOMENTE FETCH
    // console.log('handledsearch');
    // if (location.pathname === '/meals') {
    //   const data = await FetchAPIFood(searchType, searchTerm);
    //   console.log('data1:', data);
    //   if (data && data.meals && data.meals.length === 1) {
    //     const mealID = data.meals[0].idMeal;
    //     navigate(`/meals/${mealID}`);
    //   }
    //   dispatch(setSearchResults(data));
    // }
    // if (location.pathname === '/drinks') {
    //   const data = await FetchAPIDrinks(searchType, searchTerm);
    //   console.log('data2:', data);
    //   if (data && data.drinks && data.drinks.length === 1) {
    //     const drinkID = data.drinks[0].idDrink;
    //     navigate(`/drinks/${drinkID}`);
    //   }
    //   dispatch(setSearchResults(data));
    // }
  };

  const handleChangeRadio = (e:React.ChangeEvent<HTMLInputElement>) => {
    setSearchType(e.target.value);
    // console.log(searchType);
  };

  return (
    <div>
      <label>
        <input
          data-testid="ingredient-search-radio"
          type="radio"
          value="i"
          checked={ searchType === 'i' }
          onChange={ handleChangeRadio }
        />
        Ingredient
      </label>
      <label>
        <input
          data-testid="name-search-radio"
          type="radio"
          value="s"
          checked={ searchType === 's' }
          onChange={ handleChangeRadio }
        />
        Name
      </label>
      <label>
        <input
          data-testid="first-letter-search-radio"
          type="radio"
          value="f"
          checked={ searchType === 'f' }
          onChange={ handleChangeRadio }
        />
        First
      </label>
      <button data-testid="exec-search-btn" onClick={ handleSearch }>Search</button>
      {recipeList
      && (
        <RecipeList
          meals={ recipeList.data.meals }
          drinks={ recipeList.data.drinks }
        />)}
    </div>
  );
}

export default SearchBar;
