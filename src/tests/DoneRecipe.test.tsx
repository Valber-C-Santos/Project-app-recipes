import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from '../components/Helpers/renderWithRouterWithRedux';
import DoneRecipe from '../pages/DoneRecipe';

const doneRecipes:any = [
  {
    id: '52771',
    type: 'meal',
    nationality: 'Italian',
    category: 'Vegetarian',
    alcoholicOrNot: '',
    name: 'Spicy Arrabiata Penne',
    image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
    doneDate: '23/06/2020',
    tags: ['Pasta', 'Curry'],
  },
  {
    id: '178319',
    type: 'drink',
    nationality: '',
    category: 'Cocktail',
    alcoholicOrNot: 'Alcoholic',
    name: 'Aquamarine',
    image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
    doneDate: '23/06/2020',
    tags: [],
  },
];

describe('test done recipes', () => {
  beforeEach(async () => {
    await localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));
  });
  it('verifica footer e header', () => {
    const { getByTestId } = renderWithRouterAndRedux(<DoneRecipe />);

    expect(getByTestId('footer')).toBeInTheDocument();
  });
  it('verifica footer e header', () => {
    const { getByTestId } = renderWithRouterAndRedux(<DoneRecipe />);

    expect(getByTestId('footer')).toBeInTheDocument();
  });
  it('verifica title', async () => {
    renderWithRouterAndRedux(<DoneRecipe />);
    const getTitle = await screen.findByTestId('page-title');
    expect(getTitle).toBeInTheDocument();
    expect(getTitle.textContent).toBe('Done Recipes');
  });
  it('verifica Botões filtros', async () => {
    const { getByTestId } = renderWithRouterAndRedux(<DoneRecipe />);
    const getAll = await screen.findByTestId('filter-by-all-btn');
    const getMeal = await screen.findByTestId('filter-by-meal-btn');
    const getDrink = await screen.findByTestId('filter-by-drink-btn');
    const get0Horizontal = '0-horizontal-name';

    expect(getAll).toBeInTheDocument();
    expect(getMeal).toBeInTheDocument();
    expect(getDrink).toBeInTheDocument();

    await userEvent.click(getDrink);
    expect(getByTestId(get0Horizontal).textContent).toBe(doneRecipes[1].name);
    await userEvent.click(getAll);
    expect(getByTestId(get0Horizontal).textContent).toBe(doneRecipes[0].name);
    expect(getByTestId('1-horizontal-name').textContent).toBe(doneRecipes[1].name);
    await userEvent.click(getMeal);
    expect(getByTestId(get0Horizontal).textContent).toBe(doneRecipes[0].name);
  });
  it('verifica botao de compartilhar ', async () => {
    const { user } = renderWithRouterAndRedux(<DoneRecipe />);
    const getShareBtn = await screen.findByTestId('0-horizontal-share-btn');

    expect(getShareBtn).toBeInTheDocument();

    await user.click(getShareBtn);
    expect(screen.getByText('Link copied!')).toBeInTheDocument();
    const valor = await navigator.clipboard.readText();
    expect(valor).toBe('http://localhost:3000/meals/52771');
    await console.log(valor);
  });
});
