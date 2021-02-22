import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import * as actions from 'store/actions';

import classes from './Shelf.module.scss';

const Shelf = ({ userShelf, onDeleteBookFromShelf }) => {
  function deleteHandler(e, id) {
    e.preventDefault();
    onDeleteBookFromShelf(id);
    axios
      .delete(
        `https://bestreads-5b430-default-rtdb.europe-west1.firebasedatabase.app/books/${id}.json`
      )
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

const mapStateToProps = (state) => {
  return {
    userShelf: state.books.userShelf,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onDeleteBookFromShelf: (id) => dispatch(actions.deleteBookFromShelf(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Shelf);
