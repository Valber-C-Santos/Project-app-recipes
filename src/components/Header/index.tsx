import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Header() {
  const [showHeader, setShowHeader] = useState(Boolean);
  const [showProfile, setShowProfile] = useState(Boolean);
  const [showSearch, setShowSearch] = useState(Boolean);
  const [showSearchInput, setShowSearchInput] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [title, setTitle] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
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
  if (location.pathname === `\/meals\/\d+\/`) {
    setShowHeader(false);
  }
  if (location.pathname === `\/drinks\/\d+\/`) {
    setShowHeader(false);
  }
  if (location.pathname === `\/meals\/\d+\//in-progress`) {
    setShowHeader(false);
  }
  if (location.pathname === `\/drinks\/\d+\//in-progress`) {
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

  const handleClickProfile = () => {
    navigate('/profile');
  }

  const handleClickSearch = () => {
    setShowSearchInput(!showSearchInput);
    setInputValue('');
  }

  const handleInputChange = (event:React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  }

  return (
    <>
    {showHeader && <header>
      {showProfile && <img
        data-testid="profile-top-btn"
        src="../images/profileIcon.svg"
        alt="profile icon"
        onClick={ handleClickProfile }
      />}
      {showSearch && <img
        data-testid="search-top-btn"
        src="../images/searchIcon.svg"
        alt="search icon"
        onClick={ handleClickSearch }
      />}
      {showSearchInput
      && <input
        data-testid="search-input"
        type='text'
        value = {inputValue}
        onChange = {handleInputChange}
        >
      </input>}
      <title data-testid="page-title">
        {title}
      </title>
    </header>}
  </>
  );
}
