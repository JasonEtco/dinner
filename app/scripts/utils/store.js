import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import firebase from 'firebase';
import rootReducer from './rootReducer';


const config = {
  apiKey: 'AIzaSyC7tdg7KDJTvhVEPzQBCFvJZ4nIv3VxqUs',
  authDomain: 'dinner-26091.firebaseapp.com',
  databaseURL: 'https://dinner-26091.firebaseio.com',
  storageBucket: 'dinner-26091.appspot.com',
  messagingSenderId: '762925621437',
};

export const fireRef = firebase.initializeApp(config);

const defaultState = {
  general: {
    messages: {},
    isFetching: true,
  },
};

const enhancers = compose(
  applyMiddleware(thunk),
  window.devToolsExtension ? window.devToolsExtension() : f => f,
);

const store = createStore(
  rootReducer,
  defaultState,
  enhancers,
);

export default store;
