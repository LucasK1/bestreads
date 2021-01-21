import React, { useContext } from 'react';
import axios from 'axios';

import { BooksContext } from './context/BooksContext';

import classes from './Shelf.module.scss';

const Shelf = () => {
  const { userShelf, deleteBookFromShelf } = useContext(BooksContext);

  const deleteHandler = (e, id) => {
    e.preventDefault();
    deleteBookFromShelf(id);
    axios
      .delete(
        `https://bestreads-5b430-default-rtdb.europe-west1.firebasedatabase.app/books/${id}.json`
      )
      .then((res) => console.log(res))
      .catch(console.error);
  };

  return (
    <div className={classes.container}>
      <ul className={classes.bookList}>
        {userShelf.length ? (
          userShelf.map((book) => {
            console.log(userShelf, 'Dupa');
            console.log(book, 'Dupa1');
            return (
              <li key={book.firebaseId} className={classes.singleBook}>
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
                  onClick={(e) => deleteHandler(e, book.firebaseId)}>
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
