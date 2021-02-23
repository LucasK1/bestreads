import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import axios from 'axios';

import * as actions from 'store/actions';

import classes from './Book.module.scss';

const Book = ({ history, userShelf, updateRemoteShelf, idToken }) => {
  const [book, setBook] = useState(null);
  const [bookAdded, setBookAdded] = useState(false);
  const [bookAlreadyExists, setBookAlreadyExists] = useState(false);

  const id = history.location.pathname.replace('/', '');

  useEffect(() => {
    axios
      .get(`https://www.googleapis.com/books/v1/volumes/${id}`)
      .then(({ data }) => {
        setBook({ ...data });
        console.log(data);
      })
      .catch(console.error);
  }, [id]);

  function addToShelfHandler() {
    const isBookOnShelf = userShelf.find((item) => item.id === book.id);
    if (!idToken) {
      alert('Please log in');
    } else {
      if (!isBookOnShelf) {
        updateRemoteShelf(book, idToken);
        setBookAlreadyExists(false);
        setBookAdded(true);
      } else {
        setBookAdded(false);
        setBookAlreadyExists(true);
      }
    }
  }

  return (
    <div className={classes.main}>
      {book ? (
        <div className={classes.container}>
          <h1 className={classes.title}>{`${book.volumeInfo.title} by ${
            book.volumeInfo.authors ? book.volumeInfo.authors[0] : 'unknown'
          }`}</h1>
          <div className={classes.bookImage}>
            <img src={book.volumeInfo.imageLinks.thumbnail} alt="" />
            <span>{}</span>
          </div>
          <div className={classes.description}>
            <p className={classes.publishedDate}>
              Published{' '}
              <Moment
                format="DD MMMM YYYY"
                date={book.volumeInfo.publishedDate}
              />
            </p>
            <p
              dangerouslySetInnerHTML={{
                __html: book.volumeInfo.description,
              }}></p>
          </div>
          <button className={classes.add} onClick={addToShelfHandler}>
            Add to your shelf
          </button>
          {bookAdded ? (
            <p style={{ color: '#0f6', gridArea: 'alert' }}>
              You added a new book!
            </p>
          ) : null}
          {bookAlreadyExists ? (
            <p style={{ color: '#f00', gridArea: 'alert' }}>
              Book is already on your shelf
            </p>
          ) : null}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  userShelf: state.books.userShelf,
  idToken: state.auth.idToken,
});

const mapDispatchToProps = (dispatch) => ({
  updateRemoteShelf: (book, idToken) =>
    dispatch(actions.updateRemoteShelf(book, idToken)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Book);
