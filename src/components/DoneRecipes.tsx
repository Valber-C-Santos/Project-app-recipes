import React, { useEffect, useState } from 'react';
import DoneRecipesCard from './DoneRecipesFoodCard';

export type RecipesDoneFilterType = 'All' | 'meal' | 'drink';

function DoneRecipes() {
  const [recipesList, setRecipesList] = useState<any>();
  const [useRecipeList, setUseRecipeList] = useState<any>();

  useEffect(() => {
    const retornaValorStorage = async () => {
      const storage = await localStorage.getItem('doneRecipes');
      if (storage !== null) {
        await setRecipesList(JSON.parse(storage));
        await setUseRecipeList(JSON.parse(storage));
      }
    };
    retornaValorStorage();
  }, []);

  function handleClickFilter(value:RecipesDoneFilterType) {
    if (value !== 'All' && recipesList !== null) {
      const newValues = recipesList.filter((item:any) => item.type === value);
      setUseRecipeList(newValues);
    } else {
      setUseRecipeList(recipesList);
    }
  }
  if (useRecipeList !== undefined) {
    return (
      <div>
        <h1 data-testid="page-title">Done Recipes</h1>
        <button
          data-testid="filter-by-all-btn"
          onClick={ () => handleClickFilter('All') }
        >
          All
        </button>

        <button
          data-testid="filter-by-meal-btn"
          onClick={ () => handleClickFilter('meal') }
        >
          Meals
        </button>

        <button
          data-testid="filter-by-drink-btn"
          onClick={ () => handleClickFilter('drink') }
        >
          Drinks
        </button>

        {useRecipeList.length > 0
          ? useRecipeList.map((item: any, index:number) => (
            <DoneRecipesCard
              key={ item.id }
              value={ item }
              index={ index }
            />))
          : <h1>Nenhuma receita adicionada</h1>}
      </div>
    );
  }
}

export default DoneRecipes;
