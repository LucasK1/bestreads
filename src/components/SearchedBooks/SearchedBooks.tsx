import React, { ReactElement } from 'react';
import { NavLink } from 'react-router-dom';
import _ from 'lodash';

import { BookType } from 'types/BookTypes';

import classes from './SearchedBooks.module.scss';

interface Props {
  books: BookType[];
}

const SearchedBooks = ({ books }: Props): ReactElement => {
  const moreInfoHandler = _.debounce((e, id) => {
    console.log(books.filter((book) => book.id === id)[0]);
  }, 500);

  return (
    <div className={classes.SearchedBooks}>
      {books.length ? (
        books.map((book) => (
          <NavLink to={`/${book.id}`} key={book.id}>
            {book.volumeInfo.imageLinks ? (
              <img
                src={book.volumeInfo.imageLinks.smallThumbnail}
                className={classes.bookCover}
                alt=""
                onMouseEnter={(e) => moreInfoHandler(e, book.id)}
              />
            ) : (
              <div className={classes.noCover} key={book.id}>
                <span>{book.volumeInfo.title}</span>
                by
                <span>
                  {book.volumeInfo.authors && book.volumeInfo.authors[0]}
                </span>
              </div>
            )}
          </NavLink>
        ))
      ) : (
        <h3>Nothing found</h3>
      )}
    </div>
  );
};

export default SearchedBooks;
