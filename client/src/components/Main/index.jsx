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
        <Link to="/table1">View Table 1</Link>

        <h2>Table 2</h2>
        <Link to="/table2">View Table 2</Link>

        <h2>Add Hobby</h2>
        <Link to="/form">Add Hobby</Link>
      </div>
    </div>
  );
};

export default Main;
