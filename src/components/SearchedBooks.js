import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

import Spinner from './UI/Spinner';

import classes from './SearchedBooks.module.css';
import { debounce } from 'lodash';

const SearchedBooks = ({ search }) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchSearch = useCallback((input) => {
    const inputArray = input.split(',');
    const searchQuery = inputArray.join('+');
    axios
      .get(
        `https://www.googleapis.com/books/v1/volumes?q=${searchQuery}&maxResults=30`
      )
      .then(({ data }) => {
        console.log(data);
        const fetchedBooks = data.items;
        setBooks((prevBooks) => (prevBooks = [...fetchedBooks]));
        setLoading(false);
      })
      .then(console.error);
  }, []);

  // debounce(fetchSearch, 500);

  useEffect(() => {
    if (search) {
      setLoading(true);
      fetchSearch(search);
    }
  }, [search, fetchSearch]);
  return (
    <div className={classes.SearchedBooks}>
      {loading ? (
        <Spinner />
      ) : books ? (
        books.map((book) => {
          return book.volumeInfo.imageLinks ? (
            <img
              src={book.volumeInfo.imageLinks.smallThumbnail}
              alt=""
              className={classes.bookCover}
              key={book.id}
            />
          ) : (
            <div className={classes.noCover} key={book.id}>
              <span>{book.volumeInfo.title}</span>
            </div>
          );
        })
      ) : null}
    </div>
  );
};

export default SearchedBooks;
