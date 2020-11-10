import React from 'react';
import { Link } from 'react-router-dom';

import classes from './SearchedBooks.module.scss';

const SearchedBooks = ({ books }) => {
  return (
    <div className={classes.SearchedBooks}>
      {books.length ? (
        books.map((book) => {
          return book.volumeInfo.imageLinks ? (
            <Link to={`/${book.id}`} key={book.id}>
              <img
                src={book.volumeInfo.imageLinks.smallThumbnail}
                alt=""
                className={classes.bookCover}
              />
            </Link>
          ) : (
            <div className={classes.noCover} key={book.id}>
              <span>{book.volumeInfo.title}</span>
            </div>
          );
        })
      ) : (
        <h3>Nothing found</h3>
      )}
    </div>
  );
};

export default SearchedBooks;
