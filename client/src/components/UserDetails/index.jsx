import React, { useState, useEffect } from "react";
import styles from "./styles.module.css";
import axios from "axios";
import { useParams } from "react-router-dom";

const UserDetails = () => {
    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.href = "/login";
    };
  const [user, setUser] = useState(null);
  const { userId } = useParams();
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const url = `http://localhost:8080/api/table1/details/${userId}`;
        const response = await axios.get(url);
        setUser(response.data);
      } catch (error) {
        console.error("Błąd podczas pobierania danych użytkownika", error);
      }
    };

    fetchUserDetails();
  }, [userId]);
  
  if (!user) {
    return <div>Loading...{userId}</div>;
  }

  return (
    <div className={styles.main_container}>
          <nav className={styles.navbar}>
            <h1>MySite</h1>
            <button className={styles.white_btn} onClick={handleLogout}>
              Logout
            </button>
          </nav>
    <div className={styles.user_details}>
      <h2>User Details</h2>
      <div>
        <strong>First Name:</strong> {user.firstName}
      </div>
      <div>
        <strong>Last Name:</strong> {user.lastName}
      </div>
      <div>
        <strong>Email:</strong> {user.email}
      </div>
      <div>
       <strong>HashedPassword:</strong> {user.password}
      </div>
    </div>
    </div>
  );
};

export default UserDetails;
