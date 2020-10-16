import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { debounce } from 'lodash';

import SearchedBooks from './components/SearchedBooks';

import classes from './App.module.scss';
import Spinner from './components/UI/Spinner';

const App = () => {
  const [input, setInput] = useState('');
  const [searchedBooks, setSearchedBooks] = useState([]);
  const [loadingResults, setLoadingResults] = useState(false);

  // useEffect(() => {
  //   input ? setSearchResultsVisible(true) : setSearchResultsVisible(false);
  // }, [input]);

  const fetchSearch = debounce(
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
            const fetchedBooks = data.items;
            setSearchedBooks((prevBooks) => (prevBooks = [...fetchedBooks]));
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
    console.log('dupa');
    setLoadingResults(true);
    const inputValue = e.target.value;
    setInput((prevInput) => (prevInput = inputValue));
    fetchSearch(input);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    fetchSearch(input);
  };

  return (
    <div className={classes.App}>
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
      {input ? (
        loadingResults ? (
          <div className={classes.spinnerContainer}>
            <Spinner />
          </div>
        ) : (
          <SearchedBooks books={searchedBooks} />
        )
      ) : null}
    </div>
  );
};

export default App;
