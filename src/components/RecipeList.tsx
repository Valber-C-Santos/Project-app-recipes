import { DrinksType, MealsType } from '../type/Type';
import { RecipeCard } from './RecipeCard';

export function RecipeList(
  { meals, drinks }: MealsType & DrinksType,
  totalRecipes?:number,
) {
  const newRecipesMeals = totalRecipes
    && Array.isArray(meals) ? meals.slice(0, 12) : meals;
  const newRecipesDrinks = totalRecipes
    && Array.isArray(drinks) ? drinks.slice(0, 12) : drinks;
  // console.log('typeof: ', typeof meals);
  // console.log('array?', Array.isArray(meals));

  return (
    <div>
      {Array.isArray(newRecipesMeals) && newRecipesMeals.map((recipe, index) => (
        <RecipeCard
          key={ recipe.idMeal }
          index={ index.toString() }
          img={ recipe.strMealThumb }
          name={ recipe.strMeal }
        />
      ))}
      {Array.isArray(newRecipesDrinks) && newRecipesDrinks.map((recipe, index) => (
        <RecipeCard
          key={ recipe.idDrink }
          index={ index.toString() }
          img={ recipe.strDrinkThumb }
          name={ recipe.strDrink }
        />
      ))}
    </div>
  );
}
