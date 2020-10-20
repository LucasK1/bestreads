import React, { useContext, useState } from 'react';
import axios from 'axios';
import { debounce } from 'lodash';

import SearchedBooks from './components/SearchedBooks';

import classes from './App.module.scss';
import Spinner from './components/UI/Spinner';
import { BooksContext } from './components/context/BooksContext';

const App = () => {
  const [input, setInput] = useState('');
  const [loadingResults, setLoadingResults] = useState(false);
  const [showSearchedResults, setShowSearchedResults] = useState(false);

  const { fetchedBooks, setFetchedBooks } = useContext(BooksContext);

  const fetchBooks = debounce(
    (input) => {
      if (input) {
        const inputArray = input.split(',');
        const searchQuery = inputArray.join('+');
        axios
          .get(
            `https://www.googleapis.com/books/v1/volumes?q=${searchQuery}&maxResults=30`
          )
          .then(({ data }) => {
            console.log(data);
            const items = data.items;
            setFetchedBooks([...items]);
            setLoadingResults(false);
          })
          .then(console.error);
      }
    },
    750,
    {
      leading: false,
      trailing: true,
    }
  );

  const onChangeHandler = (e) => {
    const inputValue = e.target.value;
    setInput((prevInput) => (prevInput = inputValue));
    // fetchBooks(input);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    setLoadingResults(true);
    setShowSearchedResults(true);
    fetchBooks(input);
  };

  return (
    <div className={classes.App}>
      <header className={classes.header}>
        <h1 className={classes.title}>Welcome to Bestreads!</h1>
        <h2 className={classes.subtitle}>
          Your best alternative to THE OTHER site
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

export default App;
