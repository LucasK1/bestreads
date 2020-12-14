import React, { useContext } from 'react';
import { BooksContext } from './context/BooksContext';

import classes from './Shelf.module.scss';

const Shelf = () => {
  const { userShelf, deleteBookFromShelf } = useContext(BooksContext);

  const deleteHandler = (e, id) => {
    e.preventDefault();
    deleteBookFromShelf(id);
  };

  return (
    <div className={classes.container}>
      <ul className={classes.bookList}>
        {userShelf.length ? (
          userShelf.map((book) => {
            console.log(userShelf, 'Dupa');
            return (
              <li key={book.id} className={classes.singleBook}>
                <img
                  src={book.volumeInfo.imageLinks.smallThumbnail}
                  alt=""
                  height="75"
                  width="50"
                />
                <span className={classes.bookTitle}>
                  {`${book.volumeInfo.title} by ${
                    book.volumeInfo.authors
                      ? book.volumeInfo.authors[0]
                      : 'unknown'
                  }`}
                </span>
                <button
                  className={classes.deleteButton}
                  onClick={(e) => deleteHandler(e, book.id)}>
                  Delete
                </button>
              </li>
            );
          })
        ) : (
          <h1>Add some books to see them on the shelf!</h1>
        )}
      </ul>
    </div>
  );
};

export default Shelf;
