"use client";
import React, { useEffect, useState } from "react";
import styles from "./BookList.module.scss";
import BookItem from "./BookItem";
import Book from "../../models/book";
import DropdownNumberOfBooks from "./DropdownNumberOfBooks";
import Pagination from "./Pagination";
import { useSession } from "next-auth/react";
import { getData } from "@/utils/getFavoriteBooks";

const BookList: React.FC<{
  books: Book[];
  url: string;
  totalPages: number;
  currentPage: number;
  numberOfBooksPerPage: number;
}> = (props) => {
  const [numberOfBooksPerPage, setNumberOfBooksPerPage] = useState(
    props.numberOfBooksPerPage
  );
  const [currentPage, setCurrentPage] = useState(props.currentPage);
  const { data: session, status } = useSession();
  const userEmail = session?.user?.email;
  const [favoriteBooks, setFavoriteBooks] = useState<Book[]>([]);

  async function getFavoriteBooksData() {
    const data = await getData(userEmail);
    setFavoriteBooks(data);
  }

  useEffect(() => {
    getFavoriteBooksData();
  }, [userEmail]);

  if (status === "loading") {
    return <div>nooooooooooooooooooooooo</div>;
  }

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
            (item) => item.id === book.id
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
