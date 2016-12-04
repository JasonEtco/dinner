import React from 'react';
import { render } from 'react-dom';
import { Provider, connect } from 'react-redux';
import store from './scripts/utils/store';

import App from './scripts/components/containers/App/App';

import './styles/index.scss';

export default function mapStateToProps(state) {
  return {
    socket: state.socket,
    general: state.general,
    users: state.users,
    rooms: state.rooms,
  };
}

const Root = connect(mapStateToProps)(App);

const storeWrapper = (
  <Provider store={store}>
    <Root />
  </Provider>
);

render(storeWrapper, document.querySelector('.mount'));
