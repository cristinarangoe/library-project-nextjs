import React, { useState } from "react";
import styles from "./Pagination.module.scss";
import ChevronIconDown from "../UI/ChevronIconDown";
import { montserrat } from "@/styles/fonts";
import { useRouter } from "next/navigation";

const Pagination: React.FC<{
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  totalPages: number;
  url: string;
  numberOfBooksPerPage: number;
}> = (props) => {
  const [lowerPageRange, setLowerPageRange] = useState(props.currentPage);

  const router = useRouter();
  const currentPage = props.currentPage;
  const totalPages = props.totalPages;
  const url = props.url;
  const numberOfBooksPerPage = props.numberOfBooksPerPage;

  const nextPageClickHandler = () => {
    if (currentPage === totalPages) return;
    const tempCurrentPage = currentPage;
    props.setCurrentPage((prevState) => prevState++);
    if (totalPages <= 5) return;
    if (currentPage === totalPages) {
      setLowerPageRange(totalPages - 5);
      return;
    }
    if (totalPages - 5 <= currentPage && currentPage < totalPages) {
      setLowerPageRange(totalPages - 5);
      return;
    }
    setLowerPageRange((prevState) => prevState++);
    router.push(`${url}/${tempCurrentPage + 1}/${numberOfBooksPerPage}`);
  };

  const previousPageClickHandler = () => {
    if (currentPage === 1) return;

    const tempCurrentPage = currentPage;
    props.setCurrentPage((prevState) => prevState--);

    if (totalPages <= 5) return;

    if (totalPages - 5 < currentPage && currentPage <= totalPages) {
      setLowerPageRange((prevState) => prevState - 5);
      return;
    }
    setLowerPageRange((prevState) => prevState--);
    router.push(`${url}/${tempCurrentPage - 1}/${numberOfBooksPerPage}`);
  };

  const goToAPageClickHandler = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const target = +(e.target as HTMLButtonElement).value;
    props.setCurrentPage(target);

    if (totalPages <= 5) return;

    if (target === totalPages) {
      setLowerPageRange(totalPages - 5);
      return;
    }
    if (totalPages - 5 <= target && target < totalPages) {
      setLowerPageRange(totalPages - 5);
      return;
    }
    setLowerPageRange(() => target);
    router.push(`${url}/${target}/${numberOfBooksPerPage}`);
  };

  return (
    <div className={styles["pagination"]}>
      <div className={styles["pagination-arrow"]}>
        <button
          className={styles["pagination-button-icon-left"]}
          onClick={previousPageClickHandler}
        >
          <ChevronIconDown />
        </button>
      </div>
      <div className={styles["pagination-pages"]}>
        {currentPage > 2 && totalPages > 5 && (
          <button
            className={`${styles["pagination-button-number"]} ${montserrat.className}`}
            value={1}
            onClick={goToAPageClickHandler}
          >
            1
          </button>
        )}
        {currentPage > 2 && totalPages > 5 && (
          <p
            className={`${styles["pagination-button-number"]} ${montserrat.className}`}
          >
            ...
          </p>
        )}
        {[...new Array(totalPages > 5 ? 5 : totalPages)].map((num, i) => {
          return (
            <button
              key={lowerPageRange + i}
              className={
                currentPage === +lowerPageRange + i
                  ? styles["pagination-button-number-active"]
                  : `${styles["pagination-button-number"]} ${montserrat.className}`
              }
              value={+lowerPageRange + i}
              onClick={goToAPageClickHandler}
            >
              {+lowerPageRange + i}
            </button>
          );
        })}
        {totalPages > 5 && (
          <p
            className={`${styles["pagination-button-number"]} ${montserrat.className}`}
          >
            ...
          </p>
        )}
        {totalPages > 5 && (
          <button
            className={
              currentPage === totalPages
                ? styles["pagination-button-number-active"]
                : `${styles["pagination-button-number"]} ${montserrat.className}`
            }
            value={totalPages}
            onClick={goToAPageClickHandler}
          >
            {totalPages}
          </button>
        )}
      </div>
      <div className={styles["pagination-arrow"]}>
        <button
          className={styles["pagination-button-icon-right"]}
          onClick={nextPageClickHandler}
        >
          <ChevronIconDown />
        </button>
      </div>
    </div>
  );
};
export default Pagination;
