import React, { FC, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchBooksOnShelf } from 'store/reducers/booksReducer';

import { RootState } from 'types/StateTypes';

import classes from './Shelf.module.scss';
import ShelfItem from './ShelfItem/ShelfItem';

const Shelf: FC = () => {
  const { userShelf } = useSelector((state: RootState) => state.books);
  const { idToken, userId } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (idToken && userId) {
      dispatch(fetchBooksOnShelf(idToken, userId));
    }
  }, [dispatch, idToken, userId]);

  return (
    <div className={classes.container}>
      <ul className={classes.bookList}>
        {userShelf.length ? (
          userShelf.map((book) => {
            console.log(userShelf, 'userShelf');
            console.log(book, 'book');
            return <ShelfItem book={book} />;
          })
        ) : (
          <h1>Add some books to see them on the shelf!</h1>
        )}
      </ul>
    </div>
  );
};

export default Shelf;
