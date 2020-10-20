import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import './index.scss';
import App from './App';
import Book from './components/Book';
import BooksContextProvider from './components/context/BooksContext';

ReactDOM.render(
  <BooksContextProvider>
    <BrowserRouter>
      <Route path="/" exact component={App} />
      <Route path="/:id" exact component={Book} />
    </BrowserRouter>
  </BooksContextProvider>,
  document.getElementById('root')
);
