import React, { useEffect } from 'react';
import axios from 'axios';

const Book = ({ history }) => {
  const id = history.location.pathname;
  useEffect(() => {
    axios
      .get(`https://www.googleapis.com/books/v1/volumes${id}`)
      .then(res => console.log(res));
  });
  return (
    <div>
      <h1>Book</h1>
    </div>
  );
};

export default Book;
