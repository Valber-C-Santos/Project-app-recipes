import { useState } from 'react';
import { useLocation } from 'react-router-dom';

export default function Header() {
  const [showHeader, setShowHeader] = useState(Boolean);
  const [showProfile, setShowProfile] = useState(Boolean);
  const [showSearch, setShowSearch] = useState(Boolean);
  const location = useLocation();
  const whichRender = () => {
    if (location.pathname === '/') setShowHeader(false);
    if (location.pathname === '/meals') {
      setShowHeader(true);
      setShowProfile(true);
      setShowSearch(true);
    }
    if (location.pathname === '/drinks') {
      setShowHeader(true);
      setShowProfile(true);
      setShowSearch(true);
    }
    if (location.pathname === '/meals/d+/') {
      setShowHeader(true);
      setShowProfile(true);
      setShowSearch(true);
    }
  };
  return (
    <header>
      <img
        data-testid="profile-top-btn"
        src="../images/profileIcon.svg"
        alt="profile icon"
      />
      <img
        data-testid="search-top-btn"
        src="../images/searchIcon.svg"
        alt="search icon"
      />
      <title data-testid="page-title">
        Recipes App
      </title>
    </header>
  );
}
