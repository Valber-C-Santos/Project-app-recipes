import { Link, useLocation, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { fetchDetails } from '../components/Actions/fetchDetailsActions';
import { Dispatch, RootState } from '../components/Reducers/reducers';
import { fetchRecDrinks, fetchRecFood } from '../components/Actions/fetchRecActions';
import RecCarousel from './RecCarousel';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import { convertToRecipeFormat,
  filterDrinkIngr, filterMealIngr,
  handleInProgress, setExampleInProgress } from './RecipeDetailsFunctions';
import { RecipeType } from '../utils/type/Type';
import IngrRender from '../components/RecipeDetails/IngrRender';
import StartButton from '../components/RecipeDetails/StartButton';

export default function RecipeDetails() {
  const [shareMsg, setShareMsg] = useState(false);
  const [isFav, setIsFav] = useState(Boolean);
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
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [isInProgress, setIsInProgress] = useState(false);
  setExampleInProgress();
  useEffect(() => {
    if (!loading && id) {
      handleFavorite();
      setIsInProgress(handleInProgress(mealsOrDrinks, id));
    }
  }, [loading, id]);

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
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [data, id, dispatch, mealsOrDrinks]);

  const handleShareMsg = () => {
    setShareMsg(true);
    navigator.clipboard.writeText(window.location.href);
  };

  const handleFavorite = () => {
    const itemId = Number(id);
    const storedData = localStorage.getItem('favoriteRecipes');
    const favorites: RecipeType[] = storedData ? JSON.parse(storedData) : [];
    const index = favorites.findIndex((item) => Number(item.id) === itemId);
    if (index !== -1 && !isFirstLoad) {
      favorites.splice(index, 1);
      setIsFav(false);
    } else if (data && !isFirstLoad) {
      const pushData = convertToRecipeFormat(mealsOrDrinks, data);
      if (pushData) favorites.push(pushData);
      setIsFav(true);
    }
    if (favorites.length > 0 && isFirstLoad) setIsFav(true);
    setIsFirstLoad(false);
    localStorage.setItem('favoriteRecipes', JSON.stringify(favorites));
  };

  return (
    <div>
      {!loading && mealsOrDrinks === 'meals'
        && (
          <>
            <Header />
            { shareMsg && (<p>Link copied!</p>) }
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
                    <IngrRender key={ index } ingr={ ingr } index={ index } />
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
            <div className="button-div">
              <button data-testid="share-btn" onClick={ handleShareMsg }>
                Share
                <img src={ shareIcon } alt="shareIcon" />
              </button>
              <button onClick={ handleFavorite }>
                Favorite
                {isFav
                  ? <img
                      data-testid="favorite-btn"
                      alt="black heart"
                      src={ blackHeartIcon }
                  />
                  : <img
                      data-testid="favorite-btn"
                      alt="white heart"
                      src={ whiteHeartIcon }
                  />}
              </button>
              <Link to={ `/meals/${id}/in-progress` }>
                <StartButton isInProgress={ isInProgress } />
              </Link>
            </div>
          </>)}
      {!loading && mealsOrDrinks === 'drinks'
        && (
          <>
            <Header />
            { shareMsg && (<p>Link copied!</p>) }
            {recData && recData.meals
            && <RecCarousel type="drinks" data={ recData } />}
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
                    <IngrRender key={ index } ingr={ ingr } index={ index } />
                  ))}
                </ul>
              )}
              <h4 data-testid="instructions">{ data.drinks[0].strInstructions }</h4>
            </div>
            <Footer />
            <div className="button-div">
              <button data-testid="share-btn" onClick={ handleShareMsg }>
                Share
                <img src={ shareIcon } alt="shareIcon" />
              </button>
              <button onClick={ handleFavorite }>
                Favorite
                {isFav
                  ? <img
                      data-testid="favorite-btn"
                      alt="black heart"
                      src={ blackHeartIcon }
                  />
                  : <img
                      data-testid="favorite-btn"
                      alt="white heart"
                      src={ whiteHeartIcon }
                  />}
              </button>
              <Link to={ `/drinks/${id}/in-progress` }>
                <StartButton isInProgress={ isInProgress } />
              </Link>
            </div>
          </>)}
    </div>
  );
}
