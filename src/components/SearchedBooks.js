import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import classes from './SearchedBooks.module.scss';

const SearchedBooks = ({ books }) => {
  const [mouseHover, setMouseHover] = useState(false);
  const moreInfoHandler = (e, id) => {
    // setTimeout(() => {

    //   console.log(books.filter((book) => book.id === id)[0]);
    // }, 1000)
  };

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
                onMouseEnter={(e) => moreInfoHandler(e, book.id)}
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
