"use client";
import { useEffect, useState } from "react";
import styles from "./BookDetail.module.scss";
import { useDispatch, useSelector } from "react-redux";
import Loader from "@/components/UI/Loader";
import useFetch from "@/utils/useFetch";
import HeartIcon from "@/components/UI/HeartIcon";
import dataTransformation from "@/utils/dataTransformationBookDetail";
import { favoriteBooksActions } from "@/store/favoriteBooks";
import { RootState } from "@/store";
import { BookDetailType } from "@/models/bookDetail";
import { ApiBook } from "@/models/apiBookDetail";
import Head from "next/head";

import { Roboto } from "next/font/google";
import Image from "next/image";
import DefaultImage from "@/components/UI/DefaultImage";

function BookDetail({ params }: { params: { bookDetailSlug: string } }) {
  const [book, setBook] = useState<BookDetailType>({} as BookDetailType);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  const dispatch = useDispatch();

  const bookApi = params.bookDetailSlug[0];
  const bookId = params.bookDetailSlug[1];

  const favoriteBooks = useSelector(
    (state: RootState) => state.favoriteBooks.favoriteBooks
  );

  const { data, error } = useFetch<ApiBook>(
    `https://openlibrary.org/${bookApi}/${bookId}.json`
  );

  const getTranformatedData = async () => {
    if (data) {
      const transformedBooks: BookDetailType | undefined =
        await dataTransformation(data);
      transformedBooks && setBook(transformedBooks);
    }
  };

  const settingFavoriteBooks = () => {
    const itemsInLocalStorage = localStorage.getItem("favoriteBooks");
    if (itemsInLocalStorage) {
      const favorites = JSON.parse(itemsInLocalStorage);
      const isAFavoriteBook = favorites.find(
        (item: string) => item === "/" + bookApi + "/" + bookId
      );
      if (isAFavoriteBook) {
        setIsFavorite(true);
      } else {
        setIsFavorite(false);
      }
    }
  };

  useEffect(() => {
    settingFavoriteBooks();
    getTranformatedData();
  }, [data]);

  const saveFavoriteBookClickHandler = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const isAFavoriteBook = favoriteBooks.find((item) => item === book.id);
    if (isAFavoriteBook) {
      setIsFavorite(false);
    } else {
      setIsFavorite(true);
    }
    dispatch(
      favoriteBooksActions.saveFavoriteBooks(
        (e.target as HTMLButtonElement).value
      )
    );
  };
  if (error) {
    return <p>{error}</p>;
  }
  if (!book) {
    return <p>No se ha encontrado información acerca de este libro!</p>;
  }

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
              isFavorite
                ? styles["book-detail-content-heart-active"]
                : styles["book-detail-content-heart"]
            }`}
            key={book.id}
            value={book.id}
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
}

export default BookDetail;
