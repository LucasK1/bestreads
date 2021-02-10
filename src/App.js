import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import MainPage from './components/MainPage/MainPage';
import Book from './components/Book';
import BooksContextProvider from './components/context/BooksContext';
import Shelf from './components/Shelf';
import SignupForm from './components/SignupForm/SignupForm';
import NavBar from './components/UI/NavBar/NavBar';

const App = () => {
  return (
    <BooksContextProvider>
      <BrowserRouter>
        <div className="main-container">
          <NavBar />
          <Switch>
            <Route path="/" exact component={MainPage} />
            <Route path="/shelf" exact component={Shelf} />
            <Route path="/signup" exact component={SignupForm} />
            <Route path="/:id" exact component={Book} />
          </Switch>
        </div>
      </BrowserRouter>
    </BooksContextProvider>
  );
};

export default App;
