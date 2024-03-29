import React from "react";
import styles from "./BookItem.module.scss";
import Book from "../../models/book";
import HeartIcon from "../UI/HeartIcon";
import Link from "next/link";
import Image from "next/image";
import DefaultImage from "../UI/DefaultImage";
import { useSession } from "next-auth/react";
import { saveFavoriteBook } from "@/utils/saveFavoriteBooks";

const BookItem: React.FC<{ book: Book; isFavorite: boolean }> = (props) => {
  const { data: session } = useSession();

  const path = `/bookDetail/${props.book.id}`;

  async function saveFavoriteBookClickHandler() {
    if (session && session.user?.email !== null) {
      const book = {
        userEmail: session.user?.email,
        bookId: props.book.id,
        name: props.book.title,
      };
      saveFavoriteBook(book);
    }
  }
  return (
    <div className={styles["book-item"]}>
      <div className={styles["book-item-image"]}>
        <Link href={path}>
          <div className={styles["book-item-image-link-container"]}>
            {props.book.coverUrl ? (
              <Image
                src={props.book.coverUrl}
                alt={props.book.title}
                fill={true}
                sizes="(max-width: 640px) 100vw, (max-width: 767px) 50vw, (max-width: 1023px) 33vw, 25vw"
                priority={true}
              />
            ) : (
              <DefaultImage title={props.book.title} />
            )}
          </div>
        </Link>
        {session && (
          <button
            className={`${
              props.isFavorite
                ? styles["book-item-image-heart-active"]
                : styles["book-item-image-heart"]
            }`}
            onClick={saveFavoriteBookClickHandler}
          >
            <HeartIcon />
          </button>
        )}
      </div>
      <div className={styles["book-item-content"]}>
        <div>
          <Link href={path}>
            <h2>{props.book.title}</h2>
          </Link>
          <p>{props.book.authors}</p>
        </div>
        <div className={styles["book-item-info-link"]}>
          <Link href={path}>Mas Info</Link>
        </div>
      </div>
    </div>
  );
};

export default BookItem;
