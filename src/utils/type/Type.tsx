export type User = {
  email: string,
  password: string
};

export type MealType = {
  [key: string]: string | null;
  idMeal: string
  strMeal: string
  strDrinkAlternate: string
  strCategory: string
  strArea: string
  strInstructions: string
  strMealThumb: string
  strTags: string
  strYoutube: string
  strIngredient1: string | null
  strIngredient2: string
  strIngredient3: string
  strIngredient4: string
  strIngredient5: string
  strIngredient6: string
  strIngredient7: string
  strIngredient8: string
  strIngredient9: string
  strIngredient10: string
  strIngredient11: string
  strIngredient12: string
  strIngredient13: string
  strIngredient14: string
  strIngredient15: string
  strIngredient16: string | null
  strIngredient17: string | null
  strIngredient18: string | null
  strIngredient19: string | null
  strIngredient20: string | null
  strMeasure1: string
  strMeasure2: string
  strMeasure3: string
  strMeasure4: string
  strMeasure5: string
  strMeasure6: string
  strMeasure7: string
  strMeasure8: string
  strMeasure9: string
  strMeasure10: string
  strMeasure11: string
  strMeasure12: string
  strMeasure13: string
  strMeasure14: string
  strMeasure15: string
  strMeasure16: string | null
  strMeasure17: string | null
  strMeasure18: string | null
  strMeasure19: string | null
  strMeasure20: string | null
  strSource: string
  strImageSource: string
  strCreativeCommonsConfirmed: string
  dateModified: string
};

export type MealsType = {
  meals: Array<MealType>
};

export type DrinksType = {
  drinks: Array<DrinkType>
};

export type DrinkType = {
  [key: string]: string | null;
  idDrink: string
  strDrink: string
  strDrinkAlternate: string
  strTags: string
  strVideo: string
  strCategory: string
  strIBA: string
  strAlcoholic: string
  strGlass: string
  strInstructions: string
  strInstructionsZH_HANS: string
  strInstructionsZH_HANT: string
  strDrinkThumb: string
  strIngredient1: string
  strIngredient2: string
  strIngredient3: string
  strIngredient4: string
  strIngredient5: string
  strIngredient6: string
  strIngredient7: string
  strIngredient8: string
  strIngredient9: string
  strIngredient10: string
  strIngredient11: string
  strIngredient12: string
  strIngredient13: string
  strIngredient14: string
  strIngredient15: string
  strMeasure1: string
  strMeasure2: string
  strMeasure3: string
  strMeasure4: string
  strMeasure5: string
  strMeasure6: string
  strMeasure7: string
  strMeasure8: string
  strMeasure9: string
  strMeasure10: string
  strMeasure11: string
  strMeasure12: string
  strMeasure13: string
  strMeasure14: string
  strMeasure15: string
  strImageSource: string
  strImageAttribution: string
  strCreativeCommonsConfirmed: string
  dateModified: string
};

export type ReduxState = {
  search: { searchInput:string };
};

export type RecipeCardType = {
  index: string;
  img: string;
  name: string;
};

export type RecipeListType = {
  meals?: [],
  drinks?: [],
};

export type RecipeType = {
  id: number;
  type: string;
  nationality: string;
  category: string;
  alcoholicOrNot: string;
  name: string;
  image: string;
};

export const FETCH_FOOD_REQUEST = 'FETCH_FOOD_REQUEST';
export const FETCH_FOOD_ERROR = 'FETCH_FOOD_ERROR';
export const FETCH_FOOD_SUCCESS = 'FETCH_FOOD_SUCCESS';

export const FETCH_DRINKS_REQUEST = 'FETCH_DRINKS_REQUEST';
export const FETCH_DRINKS_ERROR = 'FETCH_DRINKS_ERROR';
export const FETCH_DRINKS_SUCCESS = 'FETCH_DRINKS_SUCCESS';

export const FETCH_DETAILS_REQUEST = 'FETCH_DETAILS_REQUEST';
export const FETCH_DETAILS_ERROR = 'FETCH_DETAILS_ERROR';
export const FETCH_DETAILS_SUCCESS = 'FETCH_DETAILS_SUCCESS';

export const FETCH_RECF_REQUEST = 'FETCH_RECF_REQUEST';
export const FETCH_RECF_ERROR = 'FETCH_RECF_ERROR';
export const FETCH_RECF_SUCCESS = 'FETCH_RECF_SUCCESS';

export const FETCH_RECD_REQUEST = 'FETCH_RECD_REQUEST';
export const FETCH_RECD_ERROR = 'FETCH_RECD_ERROR';
export const FETCH_RECD_SUCCESS = 'FETCH_RECD_SUCCESS';
