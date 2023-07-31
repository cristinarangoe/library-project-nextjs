"use client";
import React from "react";
import { signOut, useSession } from "next-auth/react";
import ChangePasswordForm from "./ChangePasswordForm";
import styles from "./ProfilePageContent.module.scss";

function ProfilePageContent() {
  const { data: session } = useSession();
  return (
    <div className={styles["profile"]}>
      <h2>Perfil {session?.user?.email}</h2>
      <div className={styles["profile-content"]}>
        <ChangePasswordForm />
        <div className={styles["profile-logout-content"]}>
          <h3>Deseas cerrar sesión? </h3>
          <button onClick={() => signOut()} className={styles["logout-button"]}>
            Cerrar sesión
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProfilePageContent;
