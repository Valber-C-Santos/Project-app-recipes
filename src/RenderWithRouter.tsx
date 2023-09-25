import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

const renderWithRouter = (rende: JSX.Element, { route = '/' } = {}) => {
  window.history.pushState({}, '', route);

  return {
    user: userEvent.setup(),
    ...render(rende, { wrapper: BrowserRouter }),
  };
};

export default renderWithRouter;
