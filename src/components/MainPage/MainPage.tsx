import React, { ChangeEvent, FC, FormEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

import { RootState } from 'types/StateTypes';

import SearchedBooks from 'components/SearchedBooks/SearchedBooks';
import Spinner from 'components/UI/Spinner';

import classes from './MainPage.module.scss';
import { setFetchedBooks } from 'store/reducers/booksReducer';

const MainPage: FC = () => {
  const [input, setInput] = useState('');
  const [loadingResults, setLoadingResults] = useState(false);
  const [showSearchedResults, setShowSearchedResults] = useState(false);

  const { fetchedBooks } = useSelector((state: RootState) => state.books);
  const dispatch = useDispatch();

  function fetchBooks(input: string) {
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
            dispatch(setFetchedBooks({ fetchedBooks: [...items] }));
          } else {
            dispatch(setFetchedBooks({ fetchedBooks: [] }));
          }
          setLoadingResults(false);
        })
        .catch(console.error);
    }
  }

  function onChangeHandler(e: ChangeEvent) {
    const inputValue = (e.target as HTMLInputElement).value;
    setInput((prevInput) => (prevInput = inputValue));
  }

  function onSubmitHandler(e: FormEvent) {
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

export default MainPage;
