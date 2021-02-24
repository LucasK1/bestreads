import React, { FC } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { axiosUserBooks } from 'axiosInstances';

import { RootState } from 'types/StateTypes';
import * as actions from 'store/actions';

import classes from './Shelf.module.scss';

const Shelf: FC = () => {
  const userShelf = useSelector((state: RootState) => state.books.userShelf);
  const dispatch = useDispatch();

  function deleteHandler(id: string) {
    dispatch(actions.deleteBookFromShelf(id));

    axiosUserBooks
      .delete(`/books/${id}.json`)
      .then((res) => console.log(res))
      .catch(console.error);
  }

  return (
    <div className={classes.container}>
      <ul className={classes.bookList}>
        {userShelf.length ? (
          userShelf.map((book) => {
            console.log(userShelf, 'userShelf');
            console.log(book, 'book');
            return (
              <li key={book.firebaseId} className={classes.singleBook}>
                <img
                  src={
                    book.volumeInfo.imageLinks &&
                    book.volumeInfo.imageLinks.smallThumbnail
                  }
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
                  onClick={() => deleteHandler(book.firebaseId)}>
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
