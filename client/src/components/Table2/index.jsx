import React, { useState, useEffect } from "react";
import styles from "./styles.module.css";
import { Link, Route, Routes } from "react-router-dom";
import axios from "axios";
import HobbyDetails from "../HobbyDetails";
import EditHobby from "../EditHobby";

const Table2 = () => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  const [hobbies, setHobbies] = useState([]);
  const token = localStorage.getItem("token"); // Pobierz token z localStorage

  useEffect(() => {
    const fetchHobbies = async () => {
      try {
        const url = "http://localhost:8080/api/hobbies";
        const headers = {
          Authorization: `Bearer ${token}`,
        };
        const response = await axios.get(url, { headers });
        setHobbies(response.data);
      } catch (error) {
        console.error("Błąd podczas pobierania hobby", error);
      }
    };
    fetchHobbies();
  }, [token]);

  const handleDeleteHobby = async (hobbyId) => {
    try {
      const url = `http://localhost:8080/api/hobbies/delete/${hobbyId}`;
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      await axios.delete(url, { headers });
      // Odśwież listę hobby po usunięciu
      const updatedHobbies = hobbies.filter((hobby) => hobby._id !== hobbyId);
      setHobbies(updatedHobbies);
    } catch (error) {
      console.log("Błąd podczas usuwania hobby", error);
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
      <div className={styles.content}>
        <Link to="/form" className={styles.add_btn}>
          Add
        </Link>
        <br></br><br></br>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Date</th>
              <th>Hobby</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {hobbies.map((hobby) => (
              <tr key={hobby._id}>
                <td>{hobby.date}</td>
                <td>{hobby.hobby}</td>
                <td>
                  <Link
                    to={`/hobbies/details/${hobby._id}`}
                    className={styles.details_btn}
                  >
                    Details
                  </Link>
                  <Link
                    to={`/hobbies/edit/${hobby._id}`}
                    className={styles.edit_btn}
                  >
                    Edit
                  </Link>
                  <Link
                    to={`/hobbies/delete/${hobby._id}`}
                    className={styles.delete_btn}
                    onClick={() => handleDeleteHobby(hobby._id)}
                  >
                    Delete
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <br></br>
        <Link to="/form" className={styles.add_btn}>
          Add
        </Link>
      </div>

      <Routes>
        <Route path="/hobbies/details/:hobbyId" component={HobbyDetails} />
        <Route path="/hobbies/edit/:hobbyId" component={EditHobby} />
      </Routes>
    </div>
  );
};

export default Table2;
