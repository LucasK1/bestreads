import React from 'react';
import ReactDOM from 'react-dom';
import { combineReducers, createStore } from 'redux';
import { Provider } from 'react-redux';

import booksReducer from 'store/reducers/booksReducer';

import App from './App';

import './index.scss';

const rootReducer = combineReducers({
  books: booksReducer,
});

const store = createStore(rootReducer);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
