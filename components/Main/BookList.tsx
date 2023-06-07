"use client";
import React, { useEffect, useState } from "react";
import styles from "./BookList.module.scss";
import BookItem from "./BookItem";
import Book from "../../models/book";
import { useDispatch, useSelector } from "react-redux";
import { favoriteBooksActions } from "../../store/favoriteBooks";
import DropdownNumberOfBooks from "./DropdownNumberOfBooks";
import Pagination from "./Pagination";
import { RootState } from "../../store";

const BookList: React.FC<{
  books: Book[];
  url: string;
  totalPages: number;
  currentPage: number;
  numberOfBooksPerPage: number;
}> = (props) => {
  const [numberOfBooksPerPage, setNumberOfBooksPerPage] = useState(props.numberOfBooksPerPage);
  const [currentPage, setCurrentPage] = useState(props.currentPage);

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

  if (props.books.length === 0) {
    return <p>No se encontró ningún libro en esta búsqueda</p>;
  }
  return (
    <div className={styles["book-list-ppal"]}>
      <DropdownNumberOfBooks
        currentPage={currentPage}
        setNumberOfBooksPerPage={setNumberOfBooksPerPage}
        numberOfBooksPerPage={numberOfBooksPerPage}
        url={props.url}
      />
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
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={props.totalPages}
        url={props.url}
        numberOfBooksPerPage={numberOfBooksPerPage}
      />
    </div>
  );
};

export default BookList;
