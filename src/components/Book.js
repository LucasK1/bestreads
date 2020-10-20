import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import { BooksContext } from './context/BooksContext';

import classes from './Book.module.scss';

const Book = ({ history }) => {
  // const { fetchedBooks, setFetchedBooks } = useContext(BooksContext);
  const [book, setBook] = useState(null);
  const id = history.location.pathname.replace('/', '');
  useEffect(() => {
    axios
      .get(`https://www.googleapis.com/books/v1/volumes/${id}`)
      .then(({ data }) => {
        setBook({ ...data });
        console.log(data);
      });
  }, [id]);

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
            <p>{book.volumeInfo.description}</p>
          </div>
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
