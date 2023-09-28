import { DrinkType, InProgressRecipeType,
  MealType, RecipeType } from '../utils/type/Type';

export const convertToRecipeFormat = (type: string, data:any): RecipeType | null => {
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

export function filterMealIngr(meal: MealType)
  : { ingredient: string; measure: string }[] {
  const ingredients: { ingredient: string; measure: string }[] = [];
  for (let i = 1; i <= 20; i++) {
    const ingredientKey = `strIngredient${i}`;
    const measureKey = `strMeasure${i}`;

    const ingredient = meal[ingredientKey];
    const measure = meal[measureKey];

    if (ingredient !== null && ingredient !== ''
      && measure !== null && measure !== '') {
      ingredients.push({
        ingredient,
        measure,
      });
    }
  }
  return ingredients;
}

export function filterDrinkIngr(drink: DrinkType)
  : { ingredient: string; measure: string }[] {
  const ingredients: { ingredient: string; measure: string }[] = [];
  for (let i = 1; i <= 20; i++) {
    const ingredientKey = `strIngredient${i}`;
    const measureKey = `strMeasure${i}`;

    const ingredient = drink[ingredientKey];
    const measure = drink[measureKey];

    if (ingredient !== null && ingredient !== ''
      && measure !== null && measure !== '') {
      ingredients.push({
        ingredient,
        measure,
      });
    }
  }
  return ingredients;
}

export const searchRecipeById = (idToSearch: number): RecipeType | null => {
  const recipesJSON = localStorage.getItem('favoriteRecipes');
  if (recipesJSON) {
    const recipes: RecipeType[] = JSON.parse(recipesJSON);
    const foundRecipe = recipes.find((recipe) => recipe.id === idToSearch);
    if (foundRecipe) {
      return foundRecipe;
    }
  }
  return null;
};

const mealsAndDrinksEx = {
  meals: { 52771: [] },
  drinks: { 178319: [] },
};

export const setExampleInProgress = () => {
  localStorage.setItem('inProgressRecipes', JSON.stringify(mealsAndDrinksEx));
};

export const handleInProgress = (mealsOrDrinks:string, id:string) => {
  const itemId = Number(id);
  const storedData = localStorage.getItem('inProgressRecipes');
  const inProgress: InProgressRecipeType = storedData ? JSON.parse(storedData) : [];
  if (inProgress && (inProgress.drinks[itemId] || inProgress.meals[itemId])) {
    console.log('inProgress');
    return true;
  }
  return false;
};
