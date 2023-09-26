// MÉTODO ANTIGO USANDO APENAS FETCH / SEM THUNK

export async function FetchAPIFood(type: string, search: string) {
  try {
    if (type === 's' || type === 'f') {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?${type}=${search}`,
      );
      if (!response.ok) {
        return null;
      }
      const data = await response.json();
      return data;
    }
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?i=${search}`,
    );
    if (!response.ok) {
      return null;
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('error food', error);
    return null;
  }
}

export async function FetchAPIDrinks(type: string, search: string) {
  try {
    if (type === 's' || type === 'f') {
      const response = await fetch(
        `https://www.thecocktaildb.com/api/json/v1/1/search.php?${type}=${search}`,
      );
      if (!response.ok) {
        return null;
      }
      const data = await response.json();
      return data;
    }
    const response = await fetch(
      `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${search}`,
    );
    if (!response.ok) {
      return null;
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('error drinks', error);
    return null;
  }
}
