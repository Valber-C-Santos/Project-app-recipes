import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
<<<<<<< HEAD
import Login from './components/Login';
import Header from './components/Header';
import Meals from './components/Meals';
import Profile from './components/Profile';
import Drinks from './components/Drinks';
=======
import 'bootstrap/dist/css/bootstrap.min.css';
import Meals from './components/Meals';
import Drinks from './components/Drinks';
import Profile from './components/Profile';
>>>>>>> 86b48db740e7abb33d4ae90ca0db1a1e05455702
import DoneRecipes from './components/DoneRecipes';
import FavoriteRecipes from './components/FavoriteRecipes';

export default function App() {
  return (
    <Routes>
<<<<<<< HEAD
      <Route path="/" element={ <Login /> } />
=======
      {/* <Route path="/" element={ <Login /> } /> */}
>>>>>>> 86b48db740e7abb33d4ae90ca0db1a1e05455702
      <Route path="/meals" element={ <Meals /> } />
      <Route path="/drinks" element={ <Drinks /> } />
      <Route path="/profile" element={ <Profile /> } />
      <Route path="/done-recipes" element={ <DoneRecipes /> } />
      <Route path="/favorite-recipes" element={ <FavoriteRecipes /> } />
    </Routes>
  );
}
