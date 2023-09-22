export type User = {
  email: string,
  password: string
};

export type MealType = {
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
