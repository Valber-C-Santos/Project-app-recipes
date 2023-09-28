import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import Login from '../components/Login';
import renderWithRouterAndRedux from '../components/Helpers/renderWithRouterWithRedux';
import renderWithRouter from '../components/Helpers/renderWithRouter';
import Profile from '../pages/Profile';
import Footer from '../components/Footer';
import { store } from '../components/Reducers/reducers';
import App from '../App';

test('Se cobertura de 45% da tela de login.'); {
  renderWithRouterAndRedux(<Login />);
  const loginButton = screen.getByRole('button', { name: /Entrar/i });
  expect(loginButton).toBeInTheDocument();
}

test('Se verifica a existência dos campos de entrada para email e senha', () => {
  renderWithRouterAndRedux(<Login />);

  const emailInput = screen.getByTestId('email-input');
  const passwordInput = screen.getByTestId('password-input');

  expect(emailInput).toBeInTheDocument();
  expect(passwordInput).toBeInTheDocument();
});

describe('Teste Footer', () => {
  it('Renderiza', () => {
    renderWithRouter(<Provider store={ store }><Footer /></Provider>);

    expect(screen.getByTestId('footer')).toBeInTheDocument();
    expect(screen.getByTestId('meals-bottom-btn')).toBeInTheDocument();
    expect(screen.getByTestId('drinks-bottom-btn')).toBeInTheDocument();
  });
});

describe('Teste Profile', () => {
  it('Renderiza', () => {
    renderWithRouter(<Provider store={ store }><Profile /></Provider>);

    expect(screen.getByTestId('profile-email')).toBeInTheDocument();
    expect(screen.getByTestId('profile-done-btn')).toBeInTheDocument();
    expect(screen.getByTestId('profile-favorite-btn')).toBeInTheDocument();
    expect(screen.getByTestId('profile-logout-btn')).toBeInTheDocument();
  });
  it('test login user', async () => {
    const { user } = renderWithRouterAndRedux(<App />, '/');
    expect(window.location.href).toBe('http://localhost:3000/');
    const emailElem = screen.getByRole('textbox', { name: /e-mail:/i });
    const passElem = screen.getByTestId('password-input');
    await user.type(emailElem, 'example@gmail.com');
    await user.type(passElem, '1234567');
    const buttonElem = screen.getByRole('button', {
      name: /entrar/i,
    });
    await user.click(buttonElem);
  });
  it('test logout', async () => {
    renderWithRouterAndRedux(<App />, '/profile');
    await userEvent.click(screen.getByTestId('profile-logout-btn'));
  });
});
