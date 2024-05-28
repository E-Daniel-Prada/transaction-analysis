"use client"
import { handleLogOut } from "app/actions";
import styles from "./LogOutForm.module.sass";

export const LogOutForm = () => {

  const handleClick = async () => {
    await handleLogOut();
  };

  return (
    <button className={styles.BtnLogOut} onClick={handleClick}>Log Out</button>
  );
}