import React, { useState, useEffect } from "react";
import styles from "./UserDetails.module.css";
import axios from "axios";

const UserDetails = ({ userId }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const url = `http://localhost:8080/api/table1/${userId}`;
        const response = await axios.get(url);
        setUser(response.data);
      } catch (error) {
        console.error("Błąd podczas pobierania danych użytkownika", error);
      }
    };

    fetchUserDetails();
  }, [userId]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.user_details}>
      <h2>User Details</h2>
      <div>
        <strong>First Name:</strong> {user.firstName}
      </div>
      <div>
        <strong>Last Name:</strong> {user.lastName}
      </div>
      {/* Dodaj pozostałe pola danych użytkownika */}
    </div>
  );
};

export default UserDetails;
