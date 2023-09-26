import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

function renderWithRouter(component:JSX.Element, { route = '/' } = {}) {
  window.history.pushState({}, '', route);
  return {
    user: userEvent.setup(),
    ...render(component, { wrapper: BrowserRouter }),
  };
}

export default renderWithRouter;
