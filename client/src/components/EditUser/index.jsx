import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import styles from "./styles.module.css"

const EditUser = () => {
  const { userId } = useParams();
  const token = localStorage.getItem("token"); // Pobierz token z localStorage
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const url = `http://localhost:8080/api/table1/details/${userId}`;
        const headers = {
          Authorization: `Bearer ${token}`,
        };
        const response = await axios.get(url, { headers });
        setUser(response.data);
      } catch (error) {
        console.error("Błąd podczas pobierania użytkownika", error);
      }
    };
    fetchUser();
  }, [token, userId]);

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = `http://localhost:8080/api/table1/edit/${userId}`;
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      await axios.put(url, user, { headers });
      // Przekieruj użytkownika z powrotem do listy po zapisaniu edycji
      window.location.href = "/table1";
    } catch (error) {
      console.error("Błąd podczas zapisywania edycji", error);
    }
  };

  return (
    <div className={styles.main_container}>
      <nav className={styles.navbar}>
      <h1>
          <Link to="/" className={styles.site_link}>MySite</Link>
        </h1>
        <button className={styles.white_btn} onClick={handleLogout}>
          Logout
        </button>
      </nav>
      <div className={styles.edit_container}>
        <h2>Edit User</h2>
        <form className={styles.edit_form} onSubmit={handleSubmit}>
          <label>
            First Name:
            <input
              type="text"
              name="firstName"
              value={user.firstName}
              onChange={handleChange}
              className={styles.input}
            />
          </label>
          <br />
          <label>
            Last Name:
            <input
              type="text"
              name="lastName"
              value={user.lastName}
              onChange={handleChange}
              className={styles.input}
            />
          </label>
          <br />
          <label>
            Email:
            <input
              type="text"
              name="email"
              value={user.email}
              onChange={handleChange}
              className={styles.input}
            />
          </label>
          <br />
          <br />
          <button type="submit" className={styles.save_btn}>Save</button>
        </form>
      </div>
    </div>
  );
};

export default EditUser;
