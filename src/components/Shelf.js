import React, { useContext } from 'react';
import { BooksContext } from './context/BooksContext';

// import classes from './Shelf.module.scss';

const Shelf = () => {
  const { userShelf, deleteBookFromShelf } = useContext(BooksContext);

  const deleteHandler = (e, id) => {
    e.preventDefault();
    deleteBookFromShelf(id);
  };

  return (
    <div>
      <ul>
        {userShelf.length ? (
          userShelf.map((book) => {
            console.log(userShelf, 'Dupa');
            return (
              <li key={book.id}>
                <span>{book.volumeInfo.title}</span>
                <button onClick={(e) => deleteHandler(e, book.id)}>X</button>
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
