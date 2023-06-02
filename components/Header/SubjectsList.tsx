import React from "react";
import styles from "./SubjectsList.module.scss";
import { paginationActions } from "../../store/pagination";
import subjectsLists from "../../constants/subjectsList";
import { useDispatch } from "react-redux";
import Link from "next/link";

const SubjectsList: React.FC<{
  setMobileClicked: React.Dispatch<React.SetStateAction<boolean>>;
  isMobile: boolean;
  setDropdownClicked: React.Dispatch<React.SetStateAction<boolean>>;
}> = (props) => {
  const dispatch = useDispatch();

  const changeListDisplayHandler = () => {
    props.setDropdownClicked((prevState) => !prevState);
    props.isMobile && props.setMobileClicked((prevState) => !prevState);
    dispatch(paginationActions.setLimit(10));
    dispatch(paginationActions.goToAPage(1));
  };

  return (
    <ul
      onClick={changeListDisplayHandler}
      className={`${styles["dropdown-menu"]} ${
        props.isMobile && styles["dropdown-menu-mobile"]
      }`}
    >
      {subjectsLists.map((sub) => (
        <li key={sub.id} className={styles["main-nav-ppal-dropdown-option"]}>
          <Link href={`/subject/${sub.id}`}>{sub.name}</Link>
        </li>
      ))}
    </ul>
  );
};

export default SubjectsList;
