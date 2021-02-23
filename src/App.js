import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import * as actions from 'store/actions';

import MainPage from 'components/MainPage/MainPage';
import Book from 'components/Book/Book';
import Shelf from 'components/Shelf/Shelf';
import AuthForm from 'components/AuthForm/AuthForm';
import NavBar from 'components/UI/NavBar/NavBar';
import { useEffect } from 'react';
import { axiosUserBooks } from 'axiosInstances';
import { connect } from 'react-redux';

const App = ({ onSetUserShelf }) => {
  useEffect(() => {
    axiosUserBooks
      .get('/books.json')
      .then(({ data }) => {
        console.log(data, 'Dane');
        const dataValues = Object.values(data);
        const dataKeys = Object.keys(data);
        const modifiedData = dataValues.map((item, index) => {
          return { ...item, firebaseId: dataKeys[index] };
        });
        onSetUserShelf(modifiedData);
      })
      .catch(console.error);
  }, [onSetUserShelf]);

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

const mapDispatchToProps = (dispatch) => {
  return {
    onSetUserShelf: (book) => dispatch(actions.setUserShelf(book)),
  };
};

export default connect(null, mapDispatchToProps)(App);

// export default App;
