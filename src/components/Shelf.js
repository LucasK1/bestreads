import React, { useContext, useEffect } from 'react';
import { BooksContext } from './context/BooksContext';

import classes from './Shelf.module.scss';

const Shelf = () => {
  const { userShelf, setUserShelf } = useContext(BooksContext);

  const deleteBookFromShelf = (id) => {
    const newShelf = userShelf.filter((book) => book.id !== id);

    console.log(newShelf);
    setUserShelf([...newShelf]);
  };

  return (
    <div>
      <ul>
        {userShelf.length ? (
          userShelf.map((book) => {
            return (
              <>
                <li key={book.id}>{book.volumeInfo.title}</li>
                <button onClick={() => deleteBookFromShelf(book.id)}>X</button>
              </>
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
