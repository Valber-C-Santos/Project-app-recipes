import { screen, waitFor } from '@testing-library/react';
import renderWithRouterAndRedux from '../components/Helpers/renderWithRouterWithRedux';
import App from '../App';

beforeEach(() => {
  localStorage.clear();
});

test('Testa Favorite Recipes', async () => {
  const favoriteRecipes = [
    { id: '52771',
      type: 'meal',
      nationality: 'Italian',
      category: 'Vegetarian',
      alcoholicOrNot: '',
      name: 'Spicy Arrabiata Penne',
      image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',

    },
    {
      id: '178319',
      type: 'drink',
      nationality: '',
      category: 'Cocktail',
      alcoholicOrNot: 'Alcoholic',
      name: 'Aquamarine',
      image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
    },
  ];

  const idImage = '0-horizontal-image';

  localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
  const { user } = renderWithRouterAndRedux(<App />, '/favorite-recipes');
  await waitFor(() => { expect(screen.getByTestId(idImage)).toBeInTheDocument(); }, { timeout: 3000 });
  await user.click(screen.getByTestId('0-horizontal-share-btn'));
  expect(screen.getAllByText(/link copied!/i)[0]).toBeInTheDocument();
  await user.click(screen.getByTestId('filter-by-drink-btn'));
  await user.click(screen.getByTestId('filter-by-meal-btn'));
  await user.click(screen.getByTestId('filter-by-all-btn'));
  expect(screen.getByTestId(idImage)).toBeInTheDocument();
  await user.click(screen.getByTestId('0-horizontal-favorite-btn'));
  expect(screen.queryByTestId(idImage)).toBeInTheDocument();
});

test('Testa Favorite Recipes sem LocalStorage', async () => {
  renderWithRouterAndRedux(<App />, '/favorite-recipes');
  expect(screen.getByTestId('page-title')).toBeInTheDocument();
  expect(screen.queryByTestId('1-horizontal-image')).not.toBeInTheDocument();
  await waitFor(() => { expect(screen.getByTestId('filter-by-drink-btn')).toBeInTheDocument(); }, { timeout: 2000 });
});
