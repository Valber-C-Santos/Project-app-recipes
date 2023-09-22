import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';
import Header from '../components/Header';

test('Farewell, front-end', () => {
  // Este arquivo pode ser modificado ou deletado sem problemas
  render(<App />);
  const linkElement = screen.getByText(/TRYBE/i);
  expect(linkElement).toBeInTheDocument();
});

describe('Tests Header', () => {
  test('if header is rendered', () => {
    render(<Header />);
    const headerElem = screen.getByRole('banner');
    expect(headerElem).toBeInTheDocument();
  });
  test('displays the profile icon', () => {
  });
});
