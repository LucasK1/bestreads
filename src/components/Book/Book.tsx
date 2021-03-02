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

  const { idToken, userId } = useSelector((state: RootState) => state.auth);
  const { userShelf } = useSelector((state: RootState) => state.books);

  const dispatch = useDispatch();

  const id = history.location.pathname.replace('/book/', '');

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
    if (!idToken) {
      history.push('/signup?fromBook');
    } else {
      let isBookOnShelf: BookType | undefined;
      if (book) {
        isBookOnShelf = userShelf.find((item) => item.id === book.id);
      }
      if (!isBookOnShelf && book) {
        dispatch(actions.updateRemoteShelf(book, idToken, userId));
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
      <p dangerouslySetInnerHTML={{ __html: book.volumeInfo.description }}></p>
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
          {idToken ? (
            <button className={classes.add} onClick={addToShelfHandler}>
              Add to your shelf
            </button>
          ) : (
            <button className={classes.add} onClick={addToShelfHandler}>
              Sign up to continue
            </button>
          )}
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
