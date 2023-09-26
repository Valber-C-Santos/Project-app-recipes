import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { legacy_createStore as createStore } from 'redux';
import { Provider } from 'react-redux';
import { ReduxState } from '../../type/Type';
import { rootReducer } from '../Reducers/reducers';

function renderWithRouterAndRedux(
  component: JSX.Element,
  route: string = '/',
  state: ReduxState | undefined = undefined,
  store = createStore(rootReducer, state),
) {
  window.history.pushState({}, 'Test page', route);
  return {
    ...render(
      <BrowserRouter>
        <Provider store={ store }>{component}</Provider>
      </BrowserRouter>,
    ),
    user: userEvent.setup(),
    store,
  };
}

export default renderWithRouterAndRedux;
