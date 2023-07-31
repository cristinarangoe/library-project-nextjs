"use client";
import React, { useRef } from "react";
import styles from "./ChangePassword.module.scss"

async function changePassword(
  enteredOldPassword: string,
  enteredNewPassword: string
) {
  const response = await fetch("/api/user", {
    method: "PATCH",
    body: JSON.stringify({
      oldPassword: enteredOldPassword,
      newPassword: enteredNewPassword,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data;
}

function ChangePasswordForm() {
  const oldPasswordRef = useRef<HTMLInputElement | null>(null);
  const newPasswordRef = useRef<HTMLInputElement | null>(null);

  async function submitHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const enteredOldPassword = oldPasswordRef.current?.value;
    const enteredNewPassword = newPasswordRef.current?.value;

    try {
      if (enteredNewPassword && enteredOldPassword) {
        await changePassword(enteredOldPassword, enteredNewPassword);
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className={styles["change-password"]}>
      <h3>Deseas cambiar tu contraseña?</h3>
      <form onSubmit={submitHandler}>
        <div className={styles["change-password-form-content"]}>
          <label htmlFor="new-password">Contraseña nueva</label>
          <input type="password" id="newPassword" ref={newPasswordRef} />
        </div>
        <div className={styles["change-password-form-content"]}>
          <label htmlFor="old-password">Contraseña vieja</label>
          <input type="password" id="oldPassword" ref={oldPasswordRef} />
        </div>
        <div>
          <button className={styles["change-password-form-button"]}>Enviar</button>
        </div>
      </form>
    </div>
  );
}

export default ChangePasswordForm;
