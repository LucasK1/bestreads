import React, { useState } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import * as actions from 'store/actions';

import SearchedBooks from 'components/SearchedBooks/SearchedBooks';
import Spinner from 'components/UI/Spinner';

import classes from './MainPage.module.scss';

const MainPage = ({ fetchedBooks, onBooksFetched }) => {
  const [input, setInput] = useState('');
  const [loadingResults, setLoadingResults] = useState(false);
  const [showSearchedResults, setShowSearchedResults] = useState(false);

  function fetchBooks(input) {
    if (input) {
      const inputArray = input.split(',');
      const searchQuery = inputArray.join('+');
      axios
        .get(
          `https://www.googleapis.com/books/v1/volumes?q=${searchQuery}&maxResults=30&langRestrict=en`
        )
        .then(({ data }) => {
          console.log(data);
          if (data.items) {
            const items = data.items;
            onBooksFetched([...items]);
          } else {
            onBooksFetched([]);
          }
          setLoadingResults(false);
        })
        .then(console.error);
    }
  }

  function onChangeHandler(e) {
    const inputValue = e.target.value;
    setInput((prevInput) => (prevInput = inputValue));
  }

  function onSubmitHandler(e) {
    e.preventDefault();
    if (input) {
      setLoadingResults(true);
      setShowSearchedResults(true);
      fetchBooks(input);
    }
  }

  return (
    <div className={classes.MainPage}>
      <header className={classes.header}>
        <h1 className={classes.title}>Welcome to Bestreads!</h1>
        <h2 className={classes.subtitle}>
          This will be your best alternative to THE OTHER site
        </h2>
        <form onSubmit={onSubmitHandler}>
          <input
            type="text"
            placeholder="Search for books..."
            className={classes.input}
            onChange={onChangeHandler}
            value={input}
          />
        </form>
      </header>
      {showSearchedResults ? (
        loadingResults ? (
          <div className={classes.spinnerContainer}>
            <Spinner />
          </div>
        ) : (
          <div className={classes.searchedBooksContainer}>
            <SearchedBooks books={fetchedBooks} />
          </div>
        )
      ) : null}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    fetchedBooks: state.books.fetchedBooks,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onBooksFetched: (fetchedBooks) =>
      dispatch(actions.setFetchedBooks(fetchedBooks)),
    onSetUserShelf: (book) => dispatch(actions.setUserShelf(book)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
