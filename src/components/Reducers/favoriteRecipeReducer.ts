export interface Recipe {
  id: number;
  name: string;
  category: string;
  nationality?: string;
  alcoholic?: string;
  image: string;
}
const initialState: Recipe[] = [];

const removeFavoriteRecipesReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case 'REMOVE_FAVORITE_RECIPE':
      return state.filter((recipe) => recipe.id !== action.payload);
    default:
      return state;
  }
};

export default removeFavoriteRecipesReducer;
