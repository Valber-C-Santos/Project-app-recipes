import { RecipeType } from '../utils/type/Type';

const favoritesJSON = localStorage.getItem('favoriteRecipes');
const favorites: RecipeType[] = favoritesJSON ? JSON.parse(favoritesJSON) : [];

export const addFavoriteRecipe = (recipe: RecipeType) => {
  favorites.push(recipe);
  localStorage.setItem('favoriteRecipes', JSON.stringify(favorites));
};

export const convertToRecipeFormat = (type: string, data:any) => {
  let recipe: RecipeType | null = null;
  if (type === 'meals') {
    const meal = data.meals[0];
    recipe = {
      id: meal.idMeal,
      type: 'meal',
      nationality: meal.strArea,
      category: meal.strCategory,
      alcoholicOrNot: '',
      name: meal.strMeal,
      image: meal.strMealThumb,
    };
  }
  if (type === 'drinks') {
    const drinks = data.drinks[0];
    recipe = {
      id: drinks.idDrink,
      type: 'drink',
      nationality: '',
      category: drinks.strCategory,
      alcoholicOrNot: drinks.strAlcoholic,
      name: drinks.strDrink,
      image: drinks.strDrinkThumb,
    };
  }
  return recipe;
};
