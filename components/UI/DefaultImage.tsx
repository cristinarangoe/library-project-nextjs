import React from "react";
import styles from "./DefaultImage.module.scss";

const DefaultImage: React.FC<{ title: string }> = (props) => {
  return (
    <div className={styles["default-image"]}>
      <div>
        <p>{props.title}</p>
      </div>
    </div>
  );
};

export default DefaultImage;
