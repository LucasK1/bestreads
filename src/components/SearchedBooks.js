import React, { useState, useEffect } from 'react';
import axios from 'axios';
import classes from './SearchedBooks.module.css';

const SearchedBooks = ({search}) => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios
      .get(
        `https://www.googleapis.com/books/v1/volumes?q=${search}&maxResults=30`
      )
      .then(({ data }) => {
        console.log(data);
        const fetchedBooks = data.items;
        setBooks((prevBooks) => (prevBooks = [...fetchedBooks]));
      });
  }, [search]);
  return (
    <div className={classes.SearchedBooks}>
      {books
        ? books.map((book) => {
            return book.volumeInfo.imageLinks ? (
              <img
                src={book.volumeInfo.imageLinks.smallThumbnail}
                alt=""
                className={classes.bookCover}
                key={book.id}
              />
            ) : (
              <div className={classes.noImg} key={book.id}>
                <span>{book.volumeInfo.title}</span>
              </div>
            );
          })
        : null}
    </div>
  );
};

export default SearchedBooks;
