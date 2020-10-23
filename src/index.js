import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './index.scss';
import App from './App';
import Book from './components/Book';
import BooksContextProvider from './components/context/BooksContext';
import Shelf from './components/Shelf';

ReactDOM.render(
  <BooksContextProvider>
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={App} />
        <Route path="/shelf" exact component={Shelf} />
        <Route path="/:id" exact component={Book} />
      </Switch>
    </BrowserRouter>
  </BooksContextProvider>,
  document.getElementById('root')
);
