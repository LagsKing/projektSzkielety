import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./styles.module.css";
import { Link } from "react-router-dom";

const Form = () => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };
  const [formData, setFormData] = useState({
    date: "",
    hobby: "",
    userId: "",
  });

  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/users");
        setUsers(response.data);
      } catch (error) {
        console.log("Błąd podczas pobierania użytkowników", error);
      }
    };

    fetchUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:8080/api/hobbies";
      const token = localStorage.getItem("token");
      const headers = { Authorization: `Bearer ${token}` };
      const res = await axios.post(url, formData, { headers });

      console.log("Hobby dodane do bazy danych");

      setFormData({
        date: "",
        hobby: "",
        userId: "",
      });
      window.location.href = "/hobbies";
    } catch (error) {
      console.log("Wystąpił błąd podczas dodawania hobby:", error.message);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

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
      <div>
        <h2>Add Hobby</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="date">Date:</label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
          />

          <label htmlFor="hobby">Hobby:</label>
          <input
            type="text"
            id="hobby"
            name="hobby"
            value={formData.hobby}
            onChange={handleChange}
          />

          <label htmlFor="userId">Select User:</label>
          <select
            id="userId"
            name="userId"
            value={formData.userId}
            onChange={handleChange}
          >
            <option value="">-- Select User --</option>
            {users.map((user) => (
              <option key={user._id} value={user._id}>
                {user.email}
              </option>
            ))}
          </select>

          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Form;
