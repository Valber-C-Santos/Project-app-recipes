import { screen } from '@testing-library/dom';
import App from '../App';
import renderWithRouterAndRedux from '../components/Helpers/renderWithRouterWithRedux';

describe('Tests Recipe Details', () => {
  test('if recipe details is rendered', async () => {
    const { user } = renderWithRouterAndRedux(<App />, '/drinks/178319');
    const recipeThumb = await screen.findByRole('img', { name: /aquamarine/i });
    expect(recipeThumb).toBeInTheDocument();
    const recipeName = await screen.findByRole('heading', { name: /aquamarine/i });
    expect(recipeName).toBeInTheDocument();
    const recipeType = await screen.findByRole('heading', { name: /alcoholic/i });
    expect(recipeType).toBeInTheDocument();
    const ingr1El = await screen.findByText(/ingredient:hpnotiq/i);
    expect(ingr1El).toBeInTheDocument();
    const meas1El = await screen.findByText(/measure:2 oz/i);
    expect(meas1El).toBeInTheDocument();
  });
});
