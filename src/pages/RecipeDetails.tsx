import { useLocation, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { fetchDetails } from '../components/Actions/fetchDetailsActions';
import { Dispatch, RootState, store } from '../components/Reducers/reducers';
import { DrinkType, DrinksType, MealType, MealsType } from '../utils/type/Type';

export default function RecipeDetails() {
  const [loading, setLoading] = useState(true);
  const [mealIngr, setMealIngr] = useState<{ ingredient: string;
    measure: string; }[]>([]);
  const [drinkIngr, setDrinkIngr] = useState<{ ingredient: string;
    measure: string; }[]>([]);

  const { id } = useParams();
  id?.toString();
  // console.log(id);
  const location = useLocation();
  const dispatch:Dispatch = useDispatch();
  const data = useSelector((state:RootState) => state.fetchDetails.data);
  const mealsOrDrinks = location.pathname.replace(/^\/([^/]*).*$/, '$1').toString();
  // const mealsOrDrinks = rawId.match(regex)?.toString();
  // console.log(mealsOrDrinks);
  // console.log(typeof data.meals);
  // console.log(Array.isArray(data.meals));

  useEffect(() => {
    setLoading(true);
    // console.log(data);
    // console.log(id);
    if (id && mealsOrDrinks) {
      // console.log('dispatched');
      dispatch(fetchDetails(mealsOrDrinks, id))
        .then(() => {
          if (data.meals && mealsOrDrinks === 'meals') {
            setMealIngr(filterMealIngr(data.meals[0]));
          }
          if (data.drinks && mealsOrDrinks === 'drinks') {
            setDrinkIngr(filterDrinkIngr(data.drinks[0]));
          }
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [data, dispatch, id, mealsOrDrinks]);
  // if (id) {
  //   console.log('dispatched with id: ', id);
  //   dispatch(fetchDetails('meal', id));
  // }
  // console.log(data);
  // console.log(id);

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
                width="560"
                height="315"
                src={ data.meals[0].strYoutube }
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write;
                 encrypted-media; gyroscope; picture-in-picture"
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
