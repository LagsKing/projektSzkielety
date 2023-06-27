import React, { useState, useEffect } from "react";
import styles from "./styles.module.css";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

const HobbyDetails = () => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  const [hobby, setHobby] = useState(null);
  const { hobbyId } = useParams();

  useEffect(() => {
    const fetchHobbyDetails = async () => {
      try {
        const url = `http://localhost:8080/api/hobbies/details/${hobbyId}`;
        const token = localStorage.getItem("token");
        const headers = { Authorization: `Bearer ${token}` };
        const response = await axios.get(url, { headers });
        setHobby(response.data);
      } catch (error) {
        console.log("Błąd podczas pobierania danych hobby", error);
      }
    };

    fetchHobbyDetails();
  }, [hobbyId]);

  if (!hobby) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.main_container}>
      <nav className={styles.navbar}>
        <h1>
          <Link to="/" className={styles.site_link}>
            MySite
          </Link>
        </h1>
        <button className={styles.white_btn} onClick={handleLogout}>
          Logout
        </button>
      </nav>
      <div className={styles.user_details}>
        <h2>Hobby Details</h2>
        <div>
          <strong>Date:</strong> {hobby.date}
        </div>
        <div>
          <strong>Hobby:</strong> {hobby.hobby}
        </div>
        <div>
          <strong>User Email:</strong> {hobby.userEmail}
        </div>
      </div>
    </div>
  );
};

export default HobbyDetails;
