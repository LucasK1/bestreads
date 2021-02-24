import React, { FC } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import MainPage from 'components/MainPage/MainPage';
import Book from 'components/Book/Book';
import Shelf from 'components/Shelf/Shelf';
import AuthForm from 'components/AuthForm/AuthForm';
import NavBar from 'components/UI/NavBar/NavBar';
import Logout from 'components/Logout/Logout';

const App: FC = () => {
  return (
    <BrowserRouter>
      <div className="main-container">
        <NavBar />
        <Switch>
          <Route path="/" exact component={MainPage} />
          <Route path="/shelf" exact component={Shelf} />
          <Route path="/signup" exact component={AuthForm} />
          <Route path="/logout" exact component={Logout} />
          <Route path="/:id" exact component={Book} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default App;
