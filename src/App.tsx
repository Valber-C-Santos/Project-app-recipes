import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Meals from './pages/Meals';
import Drinks from './pages/Drinks';
import Profile from './pages/Profile';
import DoneRecipe from './pages/DoneRecipe';
import FavoriteRecipe from './pages/FavoriteRecipe';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={ <Login /> } />
      <Route path="/meals" element={ <Meals /> } />
      <Route path="/drinks" element={ <Drinks /> } />
      <Route path="/profile" element={ <Profile /> } />
      <Route path="/done-recipes" element={ <DoneRecipe /> } />
      <Route path="/favorite-recipes" element={ <FavoriteRecipe /> } />
    </Routes>
  );
}
