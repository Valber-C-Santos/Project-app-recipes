import React from 'react';
import { screen } from '@testing-library/dom';
import Recipes from '../pages/Recipes';
import renderWithRouterAndRedux from '../components/Helpers/renderWithRouterWithRedux';

describe('Testes do componente "Recipes"', () => {
  it('Testa se a rota "/meals" é renderizada corretamente', () => {
    renderWithRouterAndRedux(<Recipes />, '/meals');
    const titleMeals = screen.getByRole('heading', { name: /meal recipes/i });
    expect(titleMeals).toBeInTheDocument();
  });
  it('Testa se a rota "/drinks" é renderizada corretamente', () => {
    renderWithRouterAndRedux(<Recipes />, '/drinks');
    const titleDrinks = screen.getByRole('heading', { name: /drink recipes/i });
    expect(titleDrinks).toBeInTheDocument();
  });
});
