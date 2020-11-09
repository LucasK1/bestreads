import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import App from './App';
import Book from './components/Book';
import BooksContextProvider from './components/context/BooksContext';
import Shelf from './components/Shelf';
import NavBar from './components/UI/NavBar/NavBar';

import './index.scss';

ReactDOM.render(
  <BooksContextProvider>
    <BrowserRouter>
      <div className="main-container">
        <NavBar />
        <Switch>
          <Route path="/" exact component={App} />
          <Route path="/shelf" exact component={Shelf} />
          <Route path="/:id" exact component={Book} />
        </Switch>
      </div>
    </BrowserRouter>
  </BooksContextProvider>,
  document.getElementById('root')
);
