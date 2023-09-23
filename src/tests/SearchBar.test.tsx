import { vi } from 'vitest';
import { screen } from '@testing-library/dom';
import { Provider } from 'react-redux';
import renderWithRouter from '../components/Helpers/renderWithRouter';
import SearchBar from '../components/SearchBar';
import Meals from '../components/Meals';
import { store } from '../components/Reducers/reducers';
import Drinks from '../components/Drinks';
import renderWithRouterAndRedux from '../components/Helpers/renderWithRouterWithRedux';

const mockSearch = {
  data: {
    meals: [
      {
        strMeal: 'Brown Stew Chicken',
        strMealThumb: 'https://www.themealdb.com/images/media/meals/sypxpx1515365095.jpg',
        idMeal: '52940',
      },
      {
        strMeal: 'Chicken & mushroom Hotpot',
        strMealThumb: 'https://www.themealdb.com/images/media/meals/uuuspp1511297945.jpg',
        idMeal: '52846',
      },
      {
        strMeal: 'Chicken Alfredo Primavera',
        strMealThumb: 'https://www.themealdb.com/images/media/meals/syqypv1486981727.jpg',
        idMeal: '52796',
      },
      {
        strMeal: 'Chicken Basquaise',
        strMealThumb: 'https://www.themealdb.com/images/media/meals/wruvqv1511880994.jpg',
        idMeal: '52934',
      },
      {
        strMeal: 'Chicken Congee',
        strMealThumb: 'https://www.themealdb.com/images/media/meals/1529446352.jpg',
        idMeal: '52956',
      },
      {
        strMeal: 'Chicken Handi',
        strMealThumb: 'https://www.themealdb.com/images/media/meals/wyxwsp1486979827.jpg',
        idMeal: '52795',
      },
      {
        strMeal: 'Kentucky Fried Chicken',
        strMealThumb: 'https://www.themealdb.com/images/media/meals/xqusqy1487348868.jpg',
        idMeal: '52813',
      },
      {
        strMeal: 'Kung Pao Chicken',
        strMealThumb: 'https://www.themealdb.com/images/media/meals/1525872624.jpg',
        idMeal: '52945',
      },
      {
        strMeal: 'Pad See Ew',
        strMealThumb: 'https://www.themealdb.com/images/media/meals/uuuspp1468263334.jpg',
        idMeal: '52774',
      },
      {
        strMeal: 'Piri-piri chicken and slaw',
        strMealThumb: 'https://www.themealdb.com/images/media/meals/hglsbl1614346998.jpg',
        idMeal: '53039',
      },
      {
        strMeal: 'Thai Green Curry',
        strMealThumb: 'https://www.themealdb.com/images/media/meals/sstssx1487349585.jpg',
        idMeal: '52814',
      },
    ],
  },
};

const INITIAL_STATE = {
  search: { searchInput: '' },
  searchResults: { searchResults: [] },
  fetchAPI: { loading: false, data: [] },
};

describe('Test search bar', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });
  test('if components are shown', () => {
    renderWithRouter(
      <Provider store={ store }>
        <SearchBar />
      </Provider>,
    );
    const ingrEl = screen.getByText(/ingredient/i);
    const nameEl = screen.getByText(/name/i);
    const firstEl = screen.getByText(/first/i);
    expect(ingrEl).toBeInTheDocument();
    expect(nameEl).toBeInTheDocument();
    expect(firstEl).toBeInTheDocument();
  });
  test('if returns correct food search values', async () => {
    const jsdomAlert = window.alert; // https://stackoverflow.com/questions/55088482/jest-not-implemented-window-alert
    window.alert = () => {};
    const fetchResolvedValue = {
      json: async () => mockSearch,
    } as Response;

    const mockFetch = vi.spyOn(global, 'fetch')
      .mockResolvedValue(fetchResolvedValue);

    const { user } = renderWithRouterAndRedux(<Meals />, '/meals', INITIAL_STATE);

    const searchButtonEl = screen.getByTestId('exec-search-btn');
    const showSearchEl = screen.getByRole('button', { name: /search icon/i });
    const firstEl = screen.getByText(/first/i);

    await user.click(firstEl);
    await user.click(showSearchEl);

    const inputEl = await screen.findByTestId('search-input');

    await user.type(inputEl, 'c');
    expect(inputEl).toHaveValue('c');
    await user.click(searchButtonEl);

    // console.log('clickou');

    expect(mockFetch).toHaveBeenCalled();
    expect(mockFetch).toHaveBeenCalledTimes(1);
    expect(mockFetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?f=c');

    await user.clear(inputEl);
    await user.type(inputEl, 'aa');
    await user.click(firstEl);
    await user.click(searchButtonEl);
    expect(mockFetch).toHaveBeenCalledTimes(1);

    window.alert = jsdomAlert; // https://stackoverflow.com/questions/55088482/jest-not-implemented-window-alert
  });

  test('if returns correct drinks search value', async () => {
    // VI.MOCK SOBREPÕE O MOCK DE CIMA, NÃO ESQUECER DISSO!!!
    // vi.mock('../components/FetchAPI', () => ({
    //   FetchAPIFood: vi.fn(),
    //   FetchAPIDrinks: vi.fn(),
    // }));
    const jsdomAlert = window.alert; // https://stackoverflow.com/questions/55088482/jest-not-implemented-window-alert
    window.alert = () => {};

    const fetchResolvedValue = {
      json: async () => mockSearch,
    } as Response;

    const mockFetch = vi.spyOn(global, 'fetch')
      .mockResolvedValue(fetchResolvedValue);

    const { user } = renderWithRouter(<Provider store={ store }><Drinks /></Provider>, { route: '/drinks' });
    const searchButtonEl = screen.getByTestId('exec-search-btn');
    const showSearchEl = screen.getByRole('button', { name: /search icon/i });

    await user.click(showSearchEl);

    const inputEl = await screen.findByRole('textbox');

    await user.type(inputEl, 'vodka');
    await user.click(searchButtonEl);
    expect(mockFetch).toHaveBeenCalled();
    expect(mockFetch).toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=vodka');

    const nameEl = screen.getByText(/name/i);
    await user.click(nameEl);
    await user.clear(inputEl);
    await user.type(inputEl, 'vodka');
    await user.click(searchButtonEl);
    expect(mockFetch).toHaveBeenCalledTimes(2);
    expect(mockFetch).toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=vodka');

    const firstEl = screen.getByText(/first/i);
    await user.click(firstEl);
    await user.clear(inputEl);
    await user.type(inputEl, 'v');
    await user.click(searchButtonEl);
    expect(mockFetch).toHaveBeenCalledTimes(3);
    expect(mockFetch).toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/search.php?f=v');

    window.alert = jsdomAlert; // https://stackoverflow.com/questions/55088482/jest-not-implemented-window-alert
  });
});
