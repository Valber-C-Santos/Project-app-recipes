import React from 'react';
import { useLocation } from 'react-router-dom';
import Meals from './Meals';
import Drinks from './Drinks';
import Footer from '../components/Footer';

function Recipes() {
  const location = useLocation();
  const isMealsRoute = location.pathname === '/meals';

  return (
    <div>
      <h1>{isMealsRoute ? 'Meals' : 'Drinks'}</h1>
      {isMealsRoute ? <Meals /> : <Drinks />}
      <Footer />
    </div>
  );
}

export default Recipes;
