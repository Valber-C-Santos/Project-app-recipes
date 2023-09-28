import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

export interface Recipe {
  id: string;
  name: string;
  category: string;
  nationality?: string;
  alcoholicOrNot?: string;
  image: string;
  type: string;
}

export default function FavoriteRecipes() {
  const [favoriteRecipes, setFavoriteRecipes] = useState<Recipe[]>([]);
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>([]);
  const [copied, setCopied] = useState<number | null>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const savedRecipes = JSON.parse(localStorage.getItem('favoriteRecipes') || '[]');
    setFavoriteRecipes((savedRecipes));
    setFilteredRecipes((savedRecipes));
  }, []);

  const handleCopyURL = (Id: string, type: string, index: number) => {
    navigator.clipboard.writeText(`${window.location.origin}/${type}s/${Id}`).then(() => {
      setCopied(index);
      setTimeout(() => {
        setCopied(null);
      }, 2000);
    });
  };
  const handleClickFavorite = (id: string) => {
    setFavoriteRecipes(favoriteRecipes.filter((list) => list.id !== id));
    localStorage.setItem('favoriteRecipes', JSON.stringify(
      favoriteRecipes.filter((list) => list.id !== id),
    ));
  };
  // const filterByCategory = (category: string) => {
  //   if (category === 'All') {
  //     setFilteredRecipes(favoriteRecipes);
  //   } else {
  //     const filtered = favoriteRecipes.filter((recipe) => recipe.category === category);
  //     setFilteredRecipes(filtered);
  //   }
  // };

  // const handleRemoveFavorite = (recipeId: number) => {
  //   dispatch(removeFavoriteRecipe(recipeId));
  // };

  return (
    <div>
      <Header />
      <div>
        <h1>Receitas Favoritas</h1>

        <button
          data-testid="filter-by-all-btn"
          onClick={ () => setFavoriteRecipes(filteredRecipes) }
        >
          All

        </button>
        <button
          data-testid="filter-by-meal-btn"
          onClick={ () => setFavoriteRecipes(
            filteredRecipes.filter((recipe) => recipe.type === 'meal'),
          ) }
        >
          Meals

        </button>
        <button
          data-testid="filter-by-drink-btn"
          onClick={ () => setFavoriteRecipes(
            filteredRecipes.filter((recipe) => recipe.type !== 'meal'),
          ) }
        >
          Drinks

        </button>
        {favoriteRecipes.length > 0 ? (
          <ul>
            {favoriteRecipes.map((recipe, index) => (
              <li key={ recipe.id }>
                <Link
                  to={ recipe.type === 'meal' ? `http://localhost:3000/meals/${recipe.id}`
                    : `http://localhost:3000/drinks/${recipe.id}` }
                >
                  <img
                    src={ recipe.image }
                    alt={ recipe.name }
                    data-testid={ `${index}-horizontal-image` }
                    style={ { width: '150px' } }
                  />
                </Link>
                <p data-testid={ `${index}-horizontal-top-text` }>
                  {recipe.type === 'meal' ? `${recipe.nationality} -
                    ${recipe.category}` : `${recipe.alcoholicOrNot}`}
                </p>

                <Link
                  to={ recipe.type === 'meal' ? `http://localhost:3000/meals/${recipe.id}`
                    : `http://localhost:3000/drinks/${recipe.id}` }
                >
                  <p data-testid={ `${index}-horizontal-name` }>{recipe.name}</p>
                </Link>

                <button
                  onClick={ () => handleCopyURL(recipe.id, recipe.type, index) }
                  data-testid={ `btn-Copy${index}` }
                >

                  <img
                    data-testid={ `${index}-horizontal-share-btn` }
                    src="src/images/shareIcon.svg"
                    alt="Compartilhar"
                  />
                </button>
                {copied === index && <p>Link copied!</p>}

                <button
                  data-testid={ `btn-favorite${index}` }
                  onClick={ () => handleClickFavorite(recipe.id) }
                >
                  <img
                    data-testid={ `${index}-horizontal-favorite-btn` }
                    src="src/images/blackHeartIcon.svg"
                    alt="Desfavoritar"
                  />
                </button>

              </li>
            ))}
          </ul>) : 'nenhuma receita favorita'}
      </div>
      <Footer />
    </div>
  );
}
