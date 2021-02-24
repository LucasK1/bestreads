import React, { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Moment from 'react-moment';
import axios from 'axios';

import * as actions from 'store/actions';
import { RootState } from 'types/StateTypes';
import { BookType } from 'types/BookTypes';
import { RouteComponentProps } from 'react-router';

import classes from './Book.module.scss';


const Book: FC<RouteComponentProps> = ({ history }) => {
  const [book, setBook] = useState<BookType | null>(null);
  const [bookAdded, setBookAdded] = useState(false);
  const [bookAlreadyExists, setBookAlreadyExists] = useState(false);

  const idToken = useSelector((state: RootState) => state.auth.idToken);
  const userShelf = useSelector((state: RootState) => state.books.userShelf);

  const dispatch = useDispatch();

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
    let isBookOnShelf: BookType | undefined;
    if (book) {
      isBookOnShelf = userShelf.find((item) => item.id === book.id);
    }
    if (!idToken) {
      alert('Please log in');
    } else {
      if (!isBookOnShelf && book) {
        dispatch(actions.updateRemoteShelf(book, idToken));
        setBookAlreadyExists(false);
        setBookAdded(true);
      } else {
        setBookAdded(false);
        setBookAlreadyExists(true);
      }
    }
  }

  const bookDescription =
    book && book.volumeInfo.description ? (
      <p>{book.volumeInfo.description}</p>
    ) : (
      ''
    );

  return (
    <div className={classes.main}>
      {book ? (
        <div className={classes.container}>
          <h1 className={classes.title}>{`${book.volumeInfo.title} by ${
            book.volumeInfo.authors ? book.volumeInfo.authors[0] : 'unknown'
          }`}</h1>
          <div className={classes.bookImage}>
            <img
              src={
                book.volumeInfo.imageLinks &&
                book.volumeInfo.imageLinks.thumbnail
              }
              alt=""
            />
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
            {bookDescription}
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

export default Book;
