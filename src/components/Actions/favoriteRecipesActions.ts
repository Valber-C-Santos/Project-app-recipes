export const removeFavoriteRecipe = (recipeId: number) => ({
  type: 'REMOVE_FAVORITE_RECIPE',
  payload: recipeId,
});
