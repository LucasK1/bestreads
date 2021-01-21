import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';

import SearchedBooks from './components/SearchedBooks';

import classes from './App.module.scss';
import Spinner from './components/UI/Spinner';
import { BooksContext } from './components/context/BooksContext';

const App = () => {
  const [input, setInput] = useState('');
  const [loadingResults, setLoadingResults] = useState(false);
  const [showSearchedResults, setShowSearchedResults] = useState(false);

  const { fetchedBooks, setFetchedBooks, setUserShelf } = useContext(BooksContext);

  useEffect(() => {
    axios
      .get(
        'https://bestreads-5b430-default-rtdb.europe-west1.firebasedatabase.app/books.json'
      )
      .then(({ data }) => {
        console.log(data, 'Dane');
        const dataValues = Object.values(data);
        const dataKeys = Object.keys(data);
        const modifiedData = dataValues.map((item, index) => {
          return { ...item, firebaseId: dataKeys[index] };
        });
        setUserShelf(modifiedData);
      })
      .catch(console.error);
  }, [setUserShelf]);
  
  const fetchBooks = (input) => {
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
            setFetchedBooks([...items]);
          } else {
            setFetchedBooks([]);
          }
          setLoadingResults(false);
        })
        .then(console.error);
    }
  };

  const onChangeHandler = (e) => {
    const inputValue = e.target.value;
    setInput((prevInput) => (prevInput = inputValue));
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (input) {
      setLoadingResults(true);
      setShowSearchedResults(true);
      fetchBooks(input);
    }
  };

  return (
    <div className={classes.App}>
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

export default App;
