"use client"
import { handleLogin } from "app/actions";
import styles from "./LoginForm.module.sass";
import { SyntheticEvent } from "react";
import Link from "next/link";

export const LoginForm = () => {

  const handleSubmit = async (event: {
    target: any;
    preventDefault: () => void;
  
  }) => {
    const formData = new FormData(event.target);
    event.preventDefault();
    await handleLogin(formData);
  }

  return (
    <div className={styles.NewAccountForm}  >
      <h1 className={styles.NewAccountForm__title}>Login</h1>
      <form onSubmit={handleSubmit} className={styles.NewAccountForm__form}>
        <input type="text" name="email" placeholder="email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" />
        <input type="password" name="password" placeholder="password" />
        <input type="submit" name="submit" value="Login" />
        <p className={styles.NewAccountForm__signup}>Don&apos;t have an account? <Link href="/signup">Register here</Link></p>
      </form>

    </div>
  );
}