import React, { FC, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import * as actions from 'store/actions';

import MainPage from 'components/MainPage/MainPage';
import Book from 'components/Book/Book';
import Shelf from 'components/Shelf/Shelf';
import AuthForm from 'components/AuthForm/AuthForm';
import NavBar from 'components/UI/NavBar/NavBar';
import Logout from 'components/Logout/Logout';

const App: FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.authCheckState());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <div className="main-container">
        <NavBar />
        <Switch>
          <Route path="/" exact component={MainPage} />
          <Route path="/shelf" exact component={Shelf} />
          <Route path="/logout" exact component={Logout} />
          <Route path="/signup" component={AuthForm} />
          <Route path="/book/:id" exact component={Book} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default App;
