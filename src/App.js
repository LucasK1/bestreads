import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import MainPage from 'components/MainPage/MainPage';
import Book from 'components/Book/Book';
import Shelf from 'components/Shelf/Shelf';
import AuthForm from 'components/AuthForm/AuthForm';
import NavBar from 'components/UI/NavBar/NavBar';

const App = () => {
  return (
    <BrowserRouter>
      <div className="main-container">
        <NavBar />
        <Switch>
          <Route path="/" exact component={MainPage} />
          <Route path="/shelf" exact component={Shelf} />
          <Route path="/signup" exact component={AuthForm} />
          <Route path="/:id" exact component={Book} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default App;
