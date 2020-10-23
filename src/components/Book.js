import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { BooksContext } from './context/BooksContext';

import classes from './Book.module.scss';
import { Link } from 'react-router-dom';

const Book = ({ history }) => {
  const { userShelf, setUserShelf } = useContext(BooksContext);
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

  const addToShelfHandler = () => {
    const compareBook = userShelf.find((item) => item.id === book.id);
    if (!compareBook) {
      setUserShelf(book);
      setBookAlreadyExists(false);
      setBookAdded(true);
    } else {
      setBookAdded(false);
      setBookAlreadyExists(true);
      console.log('You already have that book');
    }
  };

  return (
    <div className={classes.main}>
      {book ? (
        <div className={classes.container}>
          <Link to="/">
            <button style={{ gridArea: 'back' }}>Go back</button>
          </Link>
          <Link to="/shelf">
            <button style={{ gridArea: 'shelf' }}>See the shelf</button>
          </Link>
          <h1 className={classes.title}>{`${book.volumeInfo.title} by ${
            book.volumeInfo.authors ? book.volumeInfo.authors[0] : 'unknown'
          }`}</h1>
          <div className={classes.bookImage}>
            <img src={book.volumeInfo.imageLinks.thumbnail} alt="" />
            <span>{}</span>
          </div>
          <div className={classes.description}>
            <p>{book.volumeInfo.description}</p>
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
          {/* <div className={classes.links}>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptas
            placeat tempore atque. Pariatur ipsam veniam nihil amet laudantium
            dolorem autem.
          </div> */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Book;
