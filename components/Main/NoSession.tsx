import React from "react";
import styles from "./NoSession.module.scss";
import Link from "next/link";

function NoSession() {
  return (
    <div className={styles["no-session"]}>
      <h3>No tienes una sesión activa</h3>
      <h4>Por lo tanto, no puedes ver ni añadir favoritos</h4>
      <p>
        Presiona{" "}
        <span>
          <Link href="/auth">acá</Link>
        </span>{" "}
        para iniciar sesión
      </p>
    </div>
  );
}

export default NoSession;
