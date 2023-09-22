// type HeaderProps = {
//   title: string;
//   showSearchIcon: boolean;
//   showProfileIcon: boolean;
// };

// export default function Header({ title, showProfileIcon, showSearchIcon }: HeaderProps) {
//   const [showSearchInput, setShowSearchInput] = useState(false);

//   return (
//     <header>
//       <h1 data-testid="page-title">{title}</h1>
//       {showSearchIcon && (
//         <div>
//           <button onClick={ () => setShowSearchInput(!showSearchInput) }>
//             <img src={ searchIcon } alt="Pesquisar" data-testid="search-top-btn" />
//             {showSearchInput && (
//               <input type="text" placeholder="Pesquisar" data-testid="search-input" />
//             )}
//           </button>
//         </div>
//       )}
//       {showProfileIcon && (
//         <Link to="/profile">
//           <img src={ profileIcon } alt="Perfil" data-testid="profile-top-btn" />
//         </Link>
//       )}
//     </header>

import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchInput } from '../Actions/searchActions';
import profileIcon from '../../images/profileIcon.svg';
import searchIcon from '../../images/searchIcon.svg';
import SearchBar from '../SearchBar';
import { RootState } from '../Reducers/reducers';

export default function Header() {
  const [showHeader, setShowHeader] = useState(Boolean);
  const [showProfile, setShowProfile] = useState(Boolean);
  const [showSearch, setShowSearch] = useState(Boolean);
  const [showSearchInput, setShowSearchInput] = useState(false);
  const [title, setTitle] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const mealPattern = /^\/meals\/\d+\/$/;
  const drinkPattern = /^\/drinks\/\d+\/$/;
  const mealInProgressPattern = /^\/meals\/\d+\/in-progress$/;
  const drinkInProgressPattern = /^\/drinks\/\d+\/in-progress$/;
  useEffect(() => {
    if (location.pathname === '/') setShowHeader(false);
    if (location.pathname === '/meals') {
      setShowHeader(true);
      setShowProfile(true);
      setShowSearch(true);
      setTitle('Meals');
    }
    if (location.pathname === '/drinks') {
      setShowHeader(true);
      setShowProfile(true);
      setShowSearch(true);
      setTitle('Drinks');
    }
    if (mealPattern.test(location.pathname)
    || drinkPattern.test(location.pathname)
    || mealInProgressPattern.test(location.pathname)
    || drinkInProgressPattern.test(location.pathname)) {
      setShowHeader(false);
    }
    if (location.pathname === '/profile') {
      setShowHeader(true);
      setShowProfile(true);
      setShowSearch(false);
      setTitle('Profile');
    }
    if (location.pathname === '/done-recipes') {
      setShowHeader(true);
      setShowProfile(true);
      setShowSearch(false);
      setTitle('Done Recipes');
    }
    if (location.pathname === '/favorite-recipes') {
      setShowHeader(true);
      setShowProfile(true);
      setShowSearch(false);
      setTitle('Favorite Recipes');
    }
  }, [location.pathname]);

  const handleClickProfile = () => {
    navigate('/profile');
  };

  const handleClickSearch = () => {
    setShowSearchInput(!showSearchInput);
  };

  const dispatch = useDispatch();
  const handleInputChange = (event:React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchInput(event.target.value));
  };

  return (
    <div>
      {showHeader && (
        <header>
          {showProfile && (
            <button data-testid="button-profile" onClick={ handleClickProfile }>
              <img
                data-testid="profile-top-btn"
                src={ profileIcon }
                alt="profile icon"
              />
            </button>)}
          {showSearch && (
            <button data-testid="button-search" onClick={ handleClickSearch }>
              <img
                data-testid="search-top-btn"
                src={ searchIcon }
                alt="search icon"
              />
            </button>)}
          {showSearchInput
          && <input
            data-testid="search-input"
            type="text"
            onChange={ handleInputChange }
          />}
          <title data-testid="page-title">
            {title}
          </title>
        </header>)}
      <SearchBar />
    </div>
  );
}
