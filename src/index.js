import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import './index.scss';
import App from './App';
import Book from './components/Book';

ReactDOM.render(
  <BrowserRouter>
    <Route path="/" exact component={App} />
    <Route path="/:id" exact component={Book} />
  </BrowserRouter>,
  document.getElementById('root')
);
