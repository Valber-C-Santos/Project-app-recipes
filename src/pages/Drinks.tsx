import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header/index';
import { DrinkType } from '../utils/type/Type';
import CategoryFilter from '../components/CategoryFilter';
import Footer from '../components/Footer';

export default function Drinks() {
  const [drinks, setDrinks] = useState<DrinkType[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [isFilterActive, setIsFilterActive] = useState(false);

  const clearFilters = () => {
    setSelectedCategory('');
    setIsFilterActive(false);
  };

  useEffect(() => {
    const fetchDrinks = async () => {
      try {
        let endpoint = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
        if (selectedCategory) {
          endpoint = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${selectedCategory}`;
        } else if (isFilterActive) {
          endpoint = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
        }
        const response = await fetch(endpoint);
        const data = await response.json();

        if (data.drinks && data.drinks.length === 0) {
          setDrinks(data);
        } else {
          setDrinks(data.drinks);
        }
      } catch (error) {
        console.error('Erro ao buscar receitas de bebidas:', error);
      }
    };
    fetchDrinks();
  }, [selectedCategory, isFilterActive]);

  return (
    <div>
      <Header />
      <CategoryFilter
        isCategory={ false }
        selectedCategory={ selectedCategory }
        setSelectedCategory={ setSelectedCategory }
        clearFilters={ clearFilters }

      />
      <div>
        <h1>Drink Recipes</h1>
        {drinks.slice(0, 12).map((drink, index) => {
          return (
            <div key={ index } data-testid={ `${index}-recipe-card` }>
              <Link to={ `/drinks/${drink.idDrink}` }>
                <img
                  src={ drink.strDrinkThumb }
                  alt={ drink.strDrink }
                  data-testid={ `${index}-card-img` }
                />
                <p data-testid={ `${index}-card-name` }>{drink.strDrink}</p>
              </Link>
            </div>
          );
        })}
        <Footer />
      </div>
    </div>
  );
}
