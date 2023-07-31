"use client";
import React, { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./AuthForm.module.scss";
import GoogleIcon from "../UI/GoogleIcon";
import { signIn } from "next-auth/react";
import { createUser } from "@/utils/submitAuthForm";
import GithubIcon from "../UI/GithubIcon";

function AuthForm() {
  const emailInputRef = useRef<HTMLInputElement | null>(null);
  const passwordInputRef = useRef<HTMLInputElement | null>(null);

  const [isLogin, setIsLogin] = useState(true);

  const router = useRouter();

  function switchAuthenticationModeHandler() {
    setIsLogin((prevState) => !prevState);
  }

  async function submitHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const enteredEmail = emailInputRef.current?.value;
    const enteredPassword = passwordInputRef.current?.value;

    if (enteredEmail && enteredPassword) {
      if (isLogin) {
        const result = await signIn("credentials", {
          redirect: false,
          email: enteredEmail,
          password: enteredPassword,
        });

        if (result && !result.error) {
          router.replace("/profile");
        }
      } else {
        try {
          await createUser(enteredEmail, enteredPassword);
        } catch (error) {
          console.log(error);
        }
      }
    }
  }

  return (
    <div className={styles["auth-form"]}>
      <div className={styles["auth-form-ui"]}></div>
      <div className={styles["auth-form-form-auth"]}>
        <section>
          <h2>{isLogin ? "Iniciar sesión" : "Registrarse"}</h2>
          <form onSubmit={submitHandler}>
            <div className={styles["auth-form-content"]}>
              <label htmlFor="email">Email</label>
              <input type="email" id="email" required ref={emailInputRef} />
            </div>
            <div className={styles["auth-form-content"]}>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                required
                ref={passwordInputRef}
              />
            </div>
            <div>
              <button className={styles["auth-form-button-submit"]}>
                {isLogin ? "Iniciar sesión " : "Crear cuenta "}
              </button>
              <div className={styles["auth-form-social"]}>
                <h5>O {isLogin ? "Inicia sesión con" : "Registrate con"}</h5>
                <div className={styles["auth-form-social-network"]}>
                  <button
                    onClick={() => signIn("google")}
                    className={styles["auth-form-button-submit-social"]}
                  >
                    <GoogleIcon />
                    <span>&nbsp;Google</span>
                  </button>
                  <button
                    onClick={() => signIn("github")}
                    className={styles["auth-form-button-submit-social"]}
                  >
                    <GithubIcon />
                    <span>&nbsp;Github</span>
                  </button>
                </div>
              </div>
              <h5 className={styles["auth-form-button-change-text"]}>
                {" "}
                {isLogin ? "Aún no tienes cuenta?" : "Ya tienes cuenta?"}
                <button
                  onClick={switchAuthenticationModeHandler}
                  className={styles["auth-form-button-change"]}
                >
                  {isLogin ? " Crea una!" : " Iniciar sesión"}
                </button>
              </h5>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
}

export default AuthForm;
