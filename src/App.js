import React, { Fragment } from 'react';
import { Provider } from 'react-redux';
import ReduxTosastr from 'react-redux-toastr';

import GlobalStyle from './styles/global';
import store from './store';
import Routes from './routes';

const App = () => (
  <Provider store={store}>
    <Fragment>
      <Routes />
      <ReduxTosastr />
      <GlobalStyle />
    </Fragment>
  </Provider>
);

export default App;
