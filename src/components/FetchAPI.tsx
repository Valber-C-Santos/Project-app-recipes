export async function FetchAPIFood(type: string, search: string) {
  if (type === 's' || type === 'f') {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?${type}=${search}`,
    );
    const data = await response.json();
    return data;
  }
  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${search}`,
  );
  const data = await response.json();
  return data;
}
export async function FetchAPIDrinks(type: string, search: string) {
  if (type === 's' || type === 'f') {
    const response = await fetch(
      `https://www.thecocktaildb.com/api/json/v1/1/search.php?${type}=${search}`,
    );
    const data = await response.json();
    return data;
  }
  const response = await fetch(
    `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${search}`,
  );
  const data = await response.json();
  return data;
}
