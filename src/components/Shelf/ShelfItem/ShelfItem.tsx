import { axiosUserBooks } from "axiosInstances";
import { FC } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { deleteBookFromShelf } from "store/reducers/booksReducer";
import { ShelfBookType } from "types/BookTypes";

import classes from "./ShelfItem.module.scss";

interface Props {
  book: ShelfBookType;
}

const ShelfItem: FC<Props> = ({ book }) => {
  const dispatch = useDispatch();

  const bookTitle =
    book.volumeInfo.title.length > 50
      ? book.volumeInfo.title.substring(0, 49) + "..."
      : book.volumeInfo.title;

  let readState = "";
  switch (book.readState) {
    case "wantToRead":
      readState = "Want to Read";
      break;
    case "reading":
      readState = "Reading";
      break;
    case "read":
      readState = "Read";
      break;
    default:
      readState = "";
  }

  function deleteHandler(id: string) {
    dispatch(deleteBookFromShelf({ id }));

    axiosUserBooks
      .delete(`/books/${id}.json`)
      .then((res) => console.log(res))
      .catch(console.error);
  }

  return (
    <li key={book.firebaseId} className={classes.singleBook}>
      <Link to={`/book/${book.id}`}>
        <img
          src={
            book.volumeInfo.imageLinks &&
            book.volumeInfo.imageLinks.smallThumbnail
          }
          alt=""
          height="75"
          width="50"
        />
      </Link>
      <span className={classes.bookTitle}>
        {`${bookTitle} by ${
          book.volumeInfo.authors ? book.volumeInfo.authors[0] : "unknown"
        }`}
      </span>
      <button
        className={classes.deleteButton}
        onClick={() => deleteHandler(book.firebaseId)}
      >
        Delete
      </button>
      <span>{readState}</span>
    </li>
  );
};

export default ShelfItem;
