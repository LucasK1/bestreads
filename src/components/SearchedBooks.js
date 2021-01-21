import React from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';

import classes from './SearchedBooks.module.scss';

const SearchedBooks = ({ books }) => {
  const moreInfoHandler = _.debounce((e, id) => {
    console.log(books.filter((book) => book.id === id)[0]);
  }, 500);

  return (
    <div className={classes.SearchedBooks}>
      {books.length ? (
        books.map((book) => {
          return book.volumeInfo.imageLinks ? (
            <Link to={`/${book.id}`} key={book.id}>
              <div className={classes.bookCover}>
                <img
                  src={book.volumeInfo.imageLinks.smallThumbnail}
                  alt=""
                  className={classes.bookCover}
                  onMouseEnter={(e) => moreInfoHandler(e, book.id)}
                />
                <div className={classes.bookInfoBox}>
                  {book.volumeInfo.title}
                </div>
              </div>
            </Link>
          ) : (
            <div className={classes.noCover} key={book.id}>
              <span>{book.volumeInfo.title}</span>
              by
              <span>{book.volumeInfo.authors[0]}</span>
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
