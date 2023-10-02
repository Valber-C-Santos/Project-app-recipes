import React from 'react';
import { screen, waitFor } from '@testing-library/dom';
import Recipes from '../pages/Recipes';
import renderWithRouterWithRedux from '../components/Helpers/renderWithRouterWithRedux';

describe('Testes do componente "Recipes"', () => {
  it('Testa se a rota "/meals" é renderizada corretamente', () => {
    renderWithRouterWithRedux(<Recipes />, '/meals');
    const titleMeals = screen.getByRole('heading', { name: /meal recipes/i });
    expect(titleMeals).toBeInTheDocument();
  });
  it('Testa se a rota "/drinks" é renderizada corretamente', () => {
    renderWithRouterWithRedux(<Recipes />, '/drinks');
    const titleDrinks = screen.getByRole('heading', { name: /drink recipes/i });
    expect(titleDrinks).toBeInTheDocument();
  });
  it('Testa botão "all" na rota /drinks', () => {
    renderWithRouterWithRedux(<Recipes />, '/drinks');
    const buttonDrinks = screen.getByRole('button', { name: /all/i });
    expect(buttonDrinks).toBeInTheDocument();
  });
  it('Testa botão "all" na rota /meals', () => {
    renderWithRouterWithRedux(<Recipes />, '/meals');
    const buttonMeals = screen.getByRole('button', { name: /all/i });
    expect(buttonMeals).toBeInTheDocument();
  });
  it('Testa se o radio "ingredient" é renderizado em /meals', () => {
    renderWithRouterWithRedux(<Recipes />, '/meals');
    const radioBtnMeals = screen.getByText(/ingredient/i);
    expect(radioBtnMeals).toBeInTheDocument();
  });
  it('Testa se o radio "ingredient" é renderizado em /drinks', () => {
    renderWithRouterWithRedux(<Recipes />, '/drinks');
    const radioBtnDrinks = screen.getByText(/ingredient/i);
    expect(radioBtnDrinks).toBeInTheDocument();
  });
  describe('Teste a página de receitas', () => {
    test('Testa a renderização padrão de comidas', async () => {
      renderWithRouterWithRedux(<Recipes />, '/meals');

      const arrayDeComidas = ['Corba', 'Sushi', 'Burek', 'Kumpir', 'Bistek', 'Tamiya', 'Poutine', 'Lasagne', 'Kafteji', 'Wontons', 'Dal fry', 'Koshari'];

      waitFor(() => {
        arrayDeComidas.forEach(async (comida) => {
          const title = await screen.findByRole('heading', { name: `${comida}` });
          expect(title).toBeInTheDocument();
        });
      });
    });
  });
  test('Testa a renderização padrão de bebidas', async () => {
    renderWithRouterWithRedux(<Recipes />, '/drinks');

    const arrayDeBebidas = ['GG', 'A1', 'Ace', '747', 'Kir', 'ABC', '252', 'AT&T', 'Smut', 'B-53', 'Adam', 'ACID'];

    waitFor(() => {
      arrayDeBebidas.forEach(async (bebida) => {
        const title = await screen.findByRole('heading', { name: `${bebida}` });
        expect(title).toBeInTheDocument();
      });
    });
  });
});
