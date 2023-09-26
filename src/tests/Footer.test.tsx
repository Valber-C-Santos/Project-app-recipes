import renderWithRouterAndRedux from '../components/Helpers/renderWithRouterWithRedux';
import Meals from '../pages/Meals';

describe('Teste Footer', () => {
  it('Renderiza', () => {
    const { getByTestId } = renderWithRouterAndRedux(<Meals />);

    expect(getByTestId('footer')).toBeInTheDocument();
    expect(getByTestId('meals-bottom-btn')).toBeInTheDocument();
    expect(getByTestId('drinks-bottom-btn')).toBeInTheDocument();
  });
});
