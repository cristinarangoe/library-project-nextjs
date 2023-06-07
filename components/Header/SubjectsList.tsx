import React from "react";
import styles from "./SubjectsList.module.scss";
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
          <Link href={`/subject/${sub.id}/1/10`}>{sub.name}</Link>
        </li>
      ))}
    </ul>
  );
};

export default SubjectsList;
