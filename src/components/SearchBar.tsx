import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import FetchAPI from './FetchAPI';
import { RootState } from './Reducers/reducers';

function SearchBar() {
  // const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState('i');
  const searchTerm = useSelector((state:RootState) => state.search.searchInput);

  const handleSearch = async () => {
    if (searchType === 'f' && searchTerm.length > 1) {
      window.alert('Your search must have only 1 (one) character');
    }
    console.log(searchType);
    const data = await FetchAPI(searchType, searchTerm);
    console.log(data);
  };

  return (
    <div>
      {/* <input
        type="text"
        placeholder="Search..."
        value={ searchTerm }
        onChange={ (e) => setSearchTerm(e.target.value) }
      /> */}
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
