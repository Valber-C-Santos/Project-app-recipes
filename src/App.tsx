import './App.css';
import { Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Meals from './components/Meals';
import Profile from './components/Profile';
import Drinks from './components/Drinks';
import DoneRecipes from './components/DoneRecipes';
import FavoriteRecipes from './components/FavoriteRecipes';
import Arrabiata from './components/Arrabiata';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={ <Login /> } />
      <Route path="/meals" element={ <Meals /> } />
      <Route path="/meals/52771" element={ <Arrabiata /> } />
      <Route path="/drinks" element={ <Drinks /> } />
      <Route path="/profile" element={ <Profile /> } />
      <Route path="/done-recipes" element={ <DoneRecipes /> } />
      <Route path="/favorite-recipes" element={ <FavoriteRecipes /> } />
    </Routes>
  );
}
