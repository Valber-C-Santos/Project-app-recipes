import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import Login from '../components/Login';
import renderWithRouterAndRedux from '../components/Helpers/renderWithRouterWithRedux';
import renderWithRouter from '../components/Helpers/renderWithRouter';
import Profile from '../pages/Profile';
import Footer from '../components/Footer';
import { store } from '../components/Reducers/reducers';

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
    const { getByTestId } = renderWithRouter(<Provider store={ store }><Footer /></Provider>);

    expect(getByTestId('footer')).toBeInTheDocument();
    expect(getByTestId('meals-bottom-btn')).toBeInTheDocument();
    expect(getByTestId('drinks-bottom-btn')).toBeInTheDocument();
  });
});

describe('Teste Profile', () => {
  it('Renderiza', () => {
    const { getByTestId } = renderWithRouter(<Provider store={ store }><Profile /></Provider>);

    expect(getByTestId('profile-email')).toBeInTheDocument();
    expect(getByTestId('profile-done-btn')).toBeInTheDocument();
    expect(getByTestId('profile-favorite-btn')).toBeInTheDocument();
    expect(getByTestId('profile-logout-btn')).toBeInTheDocument();
  });
});
