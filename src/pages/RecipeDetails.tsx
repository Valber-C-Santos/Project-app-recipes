import Carousel from 'react-bootstrap/Carousel';
import { useLocation, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { fetchDetails } from '../components/Actions/fetchDetailsActions';
import { Dispatch, RootState } from '../components/Reducers/reducers';
import { DrinkType, MealType } from '../utils/type/Type';
import { fetchRecDrinks, fetchRecFood } from '../components/Actions/fetchRecActions';
import RecCarousel from './RecCarousel';

export default function RecipeDetails() {
  const [loading, setLoading] = useState(true);
  const [mealIngr, setMealIngr] = useState<{ ingredient: string;
    measure: string; }[]>([]);
  const [drinkIngr, setDrinkIngr] = useState<{ ingredient: string;
    measure: string; }[]>([]);
  const { id } = useParams();
  id?.toString();
  const location = useLocation();
  const dispatch:Dispatch = useDispatch();
  const data = useSelector((state:RootState) => state.fetchDetails.data);
  const recData = useSelector((state:RootState) => state.fetchRec.data);
  const mealsOrDrinks = location.pathname.replace(/^\/([^/]*).*$/, '$1').toString();

  useEffect(() => {
    setLoading(true);
    if (id && mealsOrDrinks) {
      dispatch(fetchDetails(mealsOrDrinks, id))
        .then(() => {
          if (data.meals && mealsOrDrinks === 'meals') {
            setMealIngr(filterMealIngr(data.meals[0]));
            dispatch(fetchRecDrinks());
          }
          if (data.drinks && mealsOrDrinks === 'drinks') {
            setDrinkIngr(filterDrinkIngr(data.drinks[0]));
            dispatch(fetchRecFood());
          }
          // if (mealsOrDrinks === 'drinks') dispatch(fetchRecFood());
          // if (mealsOrDrinks === 'meals') dispatch(fetchRecDrinks());
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [data, dispatch, id, mealsOrDrinks]);

  function filterMealIngr(meal: MealType)
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

  function filterDrinkIngr(drink: DrinkType)
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

  return (
    <div>
      {!loading && mealsOrDrinks === 'meals'
        && (
          <>
            <Header />
            { console.log(recData.drinks) }
            {recData && recData.drinks
            && <RecCarousel type="meals" data={ recData } />}
            <h1>Recipe Details</h1>
            <div>
              <img
                width="360px"
                src={ data.meals[0].strMealThumb }
                alt={ data.meals[0].strMeal }
                data-testid="recipe-photo"
              />
              <h2 data-testid="recipe-title">
                { data.meals[0].strMeal }
              </h2>
              <h3 data-testid="recipe-category">
                { data.meals[0].strCategory }
              </h3>
              {mealIngr && (
                <ul>
                  {mealIngr.map((ingr, index) => (
                    <li
                      data-testid={ `${index}-ingredient-name-and-measure` }
                      key={ index }
                    >
                      <p>
                        Ingredient:
                        { ingr.ingredient }
                      </p>
                      <p>
                        Measure:
                        { ingr.measure }
                      </p>
                    </li>
                  ))}
                </ul>
              )}
              <h4 data-testid="instructions">{ data.meals[0].strInstructions }</h4>
              <iframe
                data-testid="video"
                width="360"
                src={ data.meals[0].strYoutube }
                title={ data.meals[0].strMeal }
              />

            </div>
            <Footer />
          </>)}
      {!loading && mealsOrDrinks === 'drinks'
        && (
          <>
            <Header />
            <h1>Recipe Details</h1>
            <div>
              <img
                width="360px"
                src={ data.drinks[0].strDrinkThumb }
                alt={ data.drinks[0].strDrink }
                data-testid="recipe-photo"
              />
              <h2 data-testid="recipe-title">
                { data.drinks[0].strDrink }
              </h2>
              <h3 data-testid="recipe-category">
                { data.drinks[0].strAlcoholic }
              </h3>
              {drinkIngr && (
                <ul>
                  {drinkIngr.map((ingr, index) => (
                    <li
                      data-testid={ `${index}-ingredient-name-and-measure` }
                      key={ index }
                    >
                      <p>
                        Ingredient:
                        { ingr.ingredient }
                      </p>
                      <p>
                        Measure:
                        { ingr.measure }
                      </p>
                    </li>
                  ))}
                </ul>
              )}
              <h4 data-testid="instructions">{ data.drinks[0].strInstructions }</h4>
            </div>
            <Footer />
          </>)}
    </div>
  );
}
