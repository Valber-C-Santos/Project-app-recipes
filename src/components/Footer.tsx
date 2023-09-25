import React from 'react';
import { Link } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';

function Footer() {
  return (
    <footer data-testid="footer">
      <Link to="/meals">
        <img src={ mealIcon } alt="Comidas" data-testid="meals-bottom-btn" />
      </Link>
      <Link to="/drinks">
        <img src={ drinkIcon } alt="Bebidas" data-testid="drinks-bottom-btn" />
      </Link>
    </footer>
  );
}

export default Footer;
