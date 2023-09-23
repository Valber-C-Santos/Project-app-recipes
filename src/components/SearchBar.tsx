import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { FetchAPIFood, FetchAPIDrinks } from './FetchAPI';
import { RootState } from './Reducers/reducers';
import { setSearchResults } from './Actions/searchResultActions';

function SearchBar() {
  const [searchType, setSearchType] = useState('i');
  const searchTerm = useSelector((state:RootState) => state.search.searchInput);
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSearch = async () => {
    console.log(searchType);
    if (searchType === 'f' && searchTerm.length > 1) {
      window.alert('Your search must have only 1 (one) character');
      return null;
    }
    if (location.pathname === '/meals') {
      const data = await FetchAPIFood(searchType, searchTerm);
      console.log('data1:', data);
      if (data && data.meals && data.meals.length === 1) {
        const mealID = data.meals[0].idMeal;
        navigate(`/meals/${mealID}`);
      }
      dispatch(setSearchResults(data));
    }
    if (location.pathname === '/drinks') {
      const data = await FetchAPIDrinks(searchType, searchTerm);
      console.log('data2:', data);
      if (data && data.drinks && data.drinks.length === 1) {
        const drinkID = data.drinks[0].idDrink;
        navigate(`/drinks/${drinkID}`);
      }
      dispatch(setSearchResults(data));
    }
  };

  return (
    <div>
      <label>
        <input
          data-testid="ingredient-search-radio"
          type="radio"
          value="i"
          checked={ searchType === 'i' }
          onChange={ () => setSearchType('i') }
        />
        Ingredient
      </label>
      <label>
        <input
          data-testid="name-search-radio"
          type="radio"
          value="s"
          checked={ searchType === 's' }
          onChange={ () => setSearchType('s') }
        />
        Name
      </label>
      <label>
        <input
          data-testid="first-letter-search-radio"
          type="radio"
          value="f"
          checked={ searchType === 'f' }
          onChange={ () => setSearchType('f') }
        />
        First
      </label>
      <button data-testid="exec-search-btn" onClick={ handleSearch }>Search</button>
    </div>
  );
}

export default SearchBar;
