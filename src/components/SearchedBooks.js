import React from 'react';
import { Link } from 'react-router-dom';

import classes from './SearchedBooks.module.scss';

const SearchedBooks = ({ history, books }) => {
  // const [books, setBooks] = useState([]);
  // const [loading, setLoading] = useState(false);

  // const showBookDetails = (id) => {
  //   history.push(id);
  // };
  return (
    <div className={classes.SearchedBooks}>
      {books
        ? books.map((book) => {
            return book.volumeInfo.imageLinks ? (
              <Link to={`/${book.id}`}>
                <img
                  src={book.volumeInfo.imageLinks.smallThumbnail}
                  alt=""
                  className={classes.bookCover}
                  key={book.id}
                />
              </Link>
            ) : (
              <div className={classes.noCover} key={book.id}>
                <span>{book.volumeInfo.title}</span>
              </div>
            );
          })
        : null}
    </div>
  );
};

export default SearchedBooks;
