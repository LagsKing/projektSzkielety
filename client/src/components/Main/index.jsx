import React, { useState } from "react";
import styles from "./styles.module.css";
import { Link } from "react-router-dom";

const Main = () => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <div className={styles.main_container}>
      <nav className={styles.navbar}>
        <h1>MySite</h1>
        <button className={styles.white_btn} onClick={handleLogout}>
          Logout
        </button>
      </nav>

      <div className={styles.content}>
        <h2>Table 1</h2>
        <Link to="/table1" className={styles.view_table_btn}>
          Users
        </Link>

        <h2>Table 2</h2>
        <Link to="/hobbies" className={styles.view_table_btn}>
          Hobbies
        </Link>

        <h2>List</h2>
        <Link to="/list" className={styles.view_table_btn}>
          List
        </Link>

      </div>
    </div>
  );
};

export default Main;
