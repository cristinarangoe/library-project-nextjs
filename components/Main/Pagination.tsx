import React from "react";
import styles from "./Pagination.module.scss";
import ChevronIconDown from "../UI/ChevronIconDown";
import { useDispatch, useSelector } from "react-redux";
import { paginationActions } from "../../store/pagination";
import { RootState } from "../../store";

function Pagination() {
  const dispatch = useDispatch();

  const currentPage = useSelector(
    (state: RootState) => state.pagination.currentPage
  );
  const totalPages = useSelector(
    (state: RootState) => state.pagination.totalPages
  );
  const lowerPageRange = useSelector(
    (state: RootState) => state.pagination.lowerPageRange
  );

  const nextPageClickHandler = () => {
    dispatch(paginationActions.nextPage());
  };

  const previousPageClickHandler = () => {
    dispatch(paginationActions.previousPage());
  };

  const goToAPageClickHandler = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    dispatch(
      paginationActions.goToAPage(+(e.target as HTMLButtonElement).value)
    );
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
            className={styles["pagination-button-number"]}
            value={1}
            onClick={goToAPageClickHandler}
          >
            1
          </button>
        )}
        {currentPage > 2 && totalPages > 5 && (
          <p className={styles["pagination-button-number"]}>...</p>
        )}
        {[...new Array(totalPages > 5 ? 5 : totalPages)].map((num, i) => {
          return (
            <button
              key={lowerPageRange + i}
              className={
                currentPage === +lowerPageRange + i
                  ? styles["pagination-button-number-active"]
                  : styles["pagination-button-number"]
              }
              value={+lowerPageRange + i}
              onClick={goToAPageClickHandler}
            >
              {+lowerPageRange + i}
            </button>
          );
        })}
        {totalPages > 5 && (
          <p className={styles["pagination-button-number"]}>...</p>
        )}
        {totalPages > 5 && (
          <button
            className={
              currentPage === totalPages
                ? styles["pagination-button-number-active"]
                : styles["pagination-button-number"]
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
}
export default Pagination;
