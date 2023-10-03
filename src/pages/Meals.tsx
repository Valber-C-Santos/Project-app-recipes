import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { MealType } from '../utils/type/Type';
import CategoryFilter from '../components/CategoryFilter';
import Footer from '../components/Footer';
import { RootState } from '../components/Reducers/reducers';

export default function Meals() {
  const [meals, setMeals] = useState<MealType[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [isFilterActive, setIsFilterActive] = useState(false);
  const searchTerm = useSelector((state:RootState) => state.search.searchInput);

  const clearFilters = () => {
    setSelectedCategory('');
    setIsFilterActive(false);
  };
  // const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // setIsLoading(true);
    const fetchMeals = async () => {
      try {
        let endpoint = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
        if (selectedCategory) {
          endpoint = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${selectedCategory}`;
        } else if (isFilterActive) {
          endpoint = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
        }
        const response = await fetch(endpoint);
        const data = await response.json();

        if (data.meals && data.meals.length === 0) {
          setMeals(data);
        } else {
          setMeals(data.meals);
        }
        // setIsLoading(false);
      } catch (error) {
        console.error('Erro ao buscar receitas de comidas:', error);
        // setIsLoading(false);
      }
    };
    fetchMeals();
  }, [selectedCategory, isFilterActive]);
  // console.log(meals);
  return (
    <div>
      <Header />
      <CategoryFilter
        isCategory
        selectedCategory={ selectedCategory }
        setSelectedCategory={ setSelectedCategory }
        clearFilters={ clearFilters }

      />
      <div>
        <h1>Meal Recipes</h1>
        {searchTerm === ''
          && meals && meals.length > 0 && meals.slice(0, 12).map((meal, index) => {
          return (
            <div key={ index } data-testid={ `${index}-recipe-card` }>
              <Link to={ `/meals/${meal.idMeal}` }>
                <img
                  src={ meal.strMealThumb }
                  alt={ meal.strMeal }
                  data-testid={ `${index}-card-img` }
                />
                <p data-testid={ `${index}-card-name` }>{meal.strMeal}</p>
              </Link>
            </div>
          );
        })}
        <Footer />
      </div>
    </div>

  );
}
