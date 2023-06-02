import React, { useEffect } from "react";
import styles from "./BookList.module.scss";
import BookItem from "./BookItem";
import Book from "../../models/book";
import { useDispatch, useSelector } from "react-redux";
import { favoriteBooksActions } from "../../store/favoriteBooks";
import DropdownNumberOfBooks from "./DropdownNumberOfBooks";
import Pagination from "./Pagination";
import { RootState } from "../../store";
import Loader from "../UI/Loader";

const BookList: React.FC<{
  books: Book[];
  error: string | null;
}> = (props) => {
  const dispatch = useDispatch();

  const favoriteBooks = useSelector(
    (state: RootState) => state.favoriteBooks.favoriteBooks
  );

  useEffect(() => {
    const localStorageItems = localStorage.getItem("favoriteBooks");
    if (localStorageItems) {
      const items = JSON.parse(localStorageItems);
      dispatch(favoriteBooksActions.setFavoriteBooks(items));
    }
  }, []);

  if (props.error) {
    return <p>{props.error}</p>;
  }
  if (props.books.length === 0) {
    return <p>No se encontró ningún libro en esta búsqueda</p>;
  }
  return (
    <div className={styles["book-list-ppal"]}>
      <DropdownNumberOfBooks />
      <div className={styles["books-list"]}>
        {props.books.map((book) => {
          const isAFavoriteBook = favoriteBooks.find(
            (item) => item === book.id
          );
          return (
            <BookItem
              book={book}
              key={book.id}
              isFavorite={isAFavoriteBook ? true : false}
            />
          );
        })}
      </div>
      <Pagination />
    </div>
  );
};

export default BookList;
