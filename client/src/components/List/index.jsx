import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import styles from "./styles.module.css";

const List = () => {
  const [users, setUsers] = useState([]);
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

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

  const fetchHobbyDetails = async (hobbyId) => {
    try {
      const url = `http://localhost:8080/api/hobbies/details/${hobbyId}`;
      const headers = {
        Authorization: "Bearer " + localStorage.getItem("token"),
      };
      const response = await axios.get(url, { headers });
      // Obsługa pobranych szczegółów hobby
    } catch (error) {
      console.log("Błąd podczas pobierania danych hobby", error);
    }
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
        <br></br>
    <div className={styles.list_container}>
      <h2>List</h2>
      <ul>
        {users.map((user) => (
          <li key={user._id}>
            <Link to={`/table1/details/${user._id}`} className={styles.sub_list_item}>
              {user.firstName} {user.lastName}
            </Link>
            <ul className={styles.sub_list}>
              {user.hobbies.map((hobby) => (
                <li key={hobby._id}>
                  <Link to={`/hobbies/details/${hobby._id}`} className={styles.sub_list_item}
                  onClick={() => fetchHobbyDetails(hobby._id)}>
                    {hobby.hobby}
                  </Link>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
    </div>
  );
};

export default List;
