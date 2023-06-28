import React from "react";
import styles from "./DropdownNumberOfBooks.module.scss";
import { useRouter } from "next/navigation";

const DropdownNumberOfBooks: React.FC<{
  currentPage: number;
  numberOfBooksPerPage: number;
  setNumberOfBooksPerPage: React.Dispatch<React.SetStateAction<number>>;
  url: string;
}> = (props) => {
  const router = useRouter();

  const maxBooksNumber = [5, 10, 15, 20];

  const selectedOptionChangeHandler = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    props.setNumberOfBooksPerPage(() => +e.target.value);
    router.push(`${props.url}/${props.currentPage}/${+e.target.value}`);
  };

  return (
    <div className={styles["dropdown-max-dropdown"]}>
      <select
        name="maxBooks"
        id="maxBooks"
        className={styles["max-dropdown"]}
        onChange={selectedOptionChangeHandler}
        value={props.numberOfBooksPerPage}
      >
        {maxBooksNumber.map((num, index) => (
          <option
            key={index}
            value={num}
            className={styles["max-dropdown-option"]}
          >
            {num}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DropdownNumberOfBooks;
