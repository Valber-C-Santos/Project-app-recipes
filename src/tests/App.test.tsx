import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Login from '../components/Login';
import App from '../App';
import renderWithRouter from '../RenderWithRouter';
import Profile from '../pages/Profile';
import Footer from '../components/Footer';

test('Se cobertura de 45% da tela de login.'); {
  render(<Login />, { wrapper: BrowserRouter });
  const loginButton = screen.getByRole('button', { name: /Entrar/i });
  expect(loginButton).toBeInTheDocument();
}

test('Se verifica a existência dos campos de entrada para email e senha', () => {
  render(<Login />, { wrapper: BrowserRouter });

  const emailInput = screen.getByTestId('email-input');
  const passwordInput = screen.getByTestId('password-input');

  expect(emailInput).toBeInTheDocument();
  expect(passwordInput).toBeInTheDocument();
});

describe('Teste Footer', () => {
  it('Renderiza', () => {
    const { getByTestId } = renderWithRouter(<Footer />);

    expect(getByTestId('footer')).toBeInTheDocument();
    expect(getByTestId('meals-bottom-btn')).toBeInTheDocument();
    expect(getByTestId('drinks-bottom-btn')).toBeInTheDocument();
  });
});

describe('Teste Profile', () => {
  it('Renderiza', () => {
    const { getByTestId } = renderWithRouter(<Profile />);

    expect(getByTestId('profile-email')).toBeInTheDocument();
    expect(getByTestId('profile-done-btn')).toBeInTheDocument();
    expect(getByTestId('profile-favorite-btn')).toBeInTheDocument();
    expect(getByTestId('profile-logout-btn')).toBeInTheDocument();
  });
});
