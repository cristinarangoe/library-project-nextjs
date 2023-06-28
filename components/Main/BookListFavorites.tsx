"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import BookItem from "./BookItem";
import styles from "./BookList.module.scss";
import Book from "@/models/book";
import { getData } from "@/utils/getFavoriteBooks";

function BookListFavorites() {
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

  if (status === "loading" && session) {
    return <div>nooooooooooooooooooooooo</div>;
  }

  return (
    <div className={styles["books-list"]}>
      {favoriteBooks.map((book) => (
        <BookItem book={book} key={book.id} isFavorite={true} />
      ))}
    </div>
  );
}

export default BookListFavorites;
