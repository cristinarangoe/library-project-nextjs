"use client";
import React, { useEffect } from "react";
import styles from "./BookDetailContent.module.scss";
import { BookDetailType } from "@/models/bookDetail";
import Head from "next/head";
import Image from "next/image";
import DefaultImage from "../UI/DefaultImage";
import HeartIcon from "../UI/HeartIcon";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { favoriteBooksActions } from "@/store/favoriteBooks";

const BookDetailContent: React.FC<{
  book: BookDetailType;
}> = (props) => {
  const dispatch = useDispatch();
  const book = props.book;
  const favoriteBooks = useSelector(
    (state: RootState) => state.favoriteBooks.favoriteBooks
  );

  const settingFavoriteBooks = () => {
    const localStorageFavoriteBooks = localStorage.getItem("favoriteBooks");
    if (localStorageFavoriteBooks) {
      const favorites = JSON.parse(localStorageFavoriteBooks);
      dispatch(favoriteBooksActions.setFavoriteBooks(favorites));
    }
  };

  useEffect(() => {
    settingFavoriteBooks();
  }, []);

  const saveFavoriteBookClickHandler = () => {
    dispatch(favoriteBooksActions.saveFavoriteBooks(book.id));
  };

  return (
    <div className={`${styles["book-detail"]}`}>
      <Head>
        <title>{`Libro ${book.title}`}</title>
        <meta name="" content=""></meta>
      </Head>
      <div className={styles["book-detail-img"]}>
        <div className={styles["book-detail-img-content"]}>
          {book.coverUrl ? (
            <Image
              src={book.coverUrl}
              alt={book.title}
              fill={true}
              sizes="(max-width: 640px) 100vw, 50vw"
              priority={true}
            />
          ) : (
            <DefaultImage title={book.title} />
          )}
        </div>
      </div>
      <div className={styles["book-detail-content"]}>
        <div className={styles["book-detail-content-upper-side"]}>
          <h1>{book.title}</h1>
          <button
            className={`${
              favoriteBooks.find((item) => item === book.id)
                ? styles["book-detail-content-heart-active"]
                : styles["book-detail-content-heart"]
            }`}
            onClick={saveFavoriteBookClickHandler}
          >
            <HeartIcon />
          </button>
        </div>
        <h2 className={styles["book-detail-container-authors"]}>
          {book.authors}
        </h2>
        {book.description && (
          <div className={styles["book-detail-container-description"]}>
            <h3>Descripción:</h3>
            <p>{book.description}</p>
          </div>
        )}
        <div className={styles["book-detail-container-dates"]}>
          {book.dateCreated && (
            <div>
              <h4>Fecha de creación:</h4>
              <p>{book.dateCreated}</p>
            </div>
          )}
          {book.publishDate && (
            <div>
              <h4>Fecha de publicación:</h4>
              <p>{book.publishDate}</p>
            </div>
          )}
        </div>
        {book.subjects && (
          <div className={styles["book-detail-container-subjects"]}>
            <h4>Categorías:</h4>
            <p>
              {book.subjects[0]}, {book.subjects[1]}, {book.subjects[2]} ...
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookDetailContent;
