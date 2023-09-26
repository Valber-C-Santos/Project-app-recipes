import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import { Provider } from 'react-redux';
import App from '../App';
import Header from '../components/Header/index';
import renderWithRouter from '../components/Helpers/renderWithRouter';
import { store } from '../components/Reducers/reducers';

const search = 'button-search';
const profile = 'button-profile';

afterEach(() => vi.clearAllMocks());

describe('Tests Header', async () => {
  renderWithRouter(<Provider store={ store }><App /></Provider>);
  const emailElem = screen.getByRole('textbox', {
    name: /e-mail:/i,
  });
  const passElem = screen.getByTestId('password-input');
  await userEvent.type(emailElem, 'example@gmail.com');
  await userEvent.type(passElem, '1234567');
  const buttonElem = screen.getByRole('button', {
    name: /entrar/i,
  });
  await userEvent.click(buttonElem);
  test('if header is rendered', () => {
    const headerElem = screen.getByRole('banner');
    expect(headerElem).toBeInTheDocument();
  });
  test('displays the header in /meals', () => {
    renderWithRouter(<Provider store={ store }><Header /></Provider>, { route: '/meals' });
    const profileIconElem = screen.getByTestId(profile);
    const searchIconElem = screen.getByTestId(search);
    expect(profileIconElem).toBeInTheDocument();
    expect(searchIconElem).toBeInTheDocument();
  });
  test('displays the header in /done-recipes', () => {
    renderWithRouter(<Provider store={ store }><Header /></Provider>, { route: '/done-recipes' });
    const profileIconElem = screen.getByTestId(profile);
    expect(profileIconElem).toBeInTheDocument();
  });
  test('displays the header in /favorite-recipes', () => {
    renderWithRouter(<Provider store={ store }><Header /></Provider>, { route: '/favorite-recipes' });
    const profileIconElem = screen.getByTestId(profile);
    expect(profileIconElem).toBeInTheDocument();
  });
  test('displays the header in /drinks', () => {
    renderWithRouter(<Provider store={ store }><Header /></Provider>, { route: '/drinks' });
    const profileIconElem = screen.getByTestId(profile);
    const searchIconElem = screen.getByTestId(search);
    expect(profileIconElem).toBeInTheDocument();
    expect(searchIconElem).toBeInTheDocument();
  });
  test('does not display the header in /drinks/id', () => {
    renderWithRouter(<Provider store={ store }><Header /></Provider>, { route: '/drinks/1/' });
    const headerElem = screen.queryByRole('banner');
    expect(headerElem).not.toBeInTheDocument();
  });
  test('if when click on search displays input', async () => {
    const { user } = renderWithRouter(<Provider store={ store }><Header /></Provider>, { route: '/meals' });
    const searchIconButton = screen.getByTestId(search);
    await user.click(searchIconButton);
    const inputElem = screen.getByRole('textbox');
    expect(inputElem).toBeInTheDocument();
    await user.click(searchIconButton);
    expect(inputElem).not.toBeInTheDocument();
  });
  test('if displayed input works', async () => {
    const { user } = renderWithRouter(<Provider store={ store }><Header /></Provider>, { route: '/meals' });
    const searchIconButton = screen.getByTestId(search);
    await user.click(searchIconButton);
    const inputElem = screen.getByRole('textbox');
    expect(inputElem).toBeInTheDocument();
    await user.type(inputElem, 'Pineapple');
  });
  test('handles profile click', async () => {
    const { user } = renderWithRouter(<Provider store={ store }><Header /></Provider>, { route: '/meals' });
    const profileIconElem = screen.getByTestId(profile);
    await user.click(profileIconElem);
    expect(profileIconElem).toBeInTheDocument();
  });
});
