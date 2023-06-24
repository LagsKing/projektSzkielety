import React, { useState, useEffect } from "react";
import styles from "./styles.module.css";
import { Link } from "react-router-dom";
import axios from "axios";

const Table1 = () => {

    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.href = "/login";
    };

    const [users, setUsers] = useState([]);
    const loggedInUserId = localStorage.getItem("userId");
    const token = localStorage.getItem("token"); // Pobierz token z localStorage
    
    useEffect(() => {
        const fetchUsers = async () => {
          try {
            const url = "http://localhost:8080/api/table1";
            const headers = {
              Authorization: `Bearer ${token}`,
            };
            const response = await axios.get(url, { headers });
            setUsers(response.data);
          } catch (error) {
            console.error("Błąd podczas pobierania użytkowników", error);
          }
        };
        fetchUsers();
    }, [token]);


    return (
        <div className={styles.main_container}>
          <nav className={styles.navbar}>
            <h1>MySite</h1>
            <button className={styles.white_btn} onClick={handleLogout}>
              Logout
            </button>
          </nav>
      
          <div className={styles.content}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id}>
                    <td>{user.firstName}</td>
                    <td>{user.lastName}</td>
                    <td>
                      <Link to={`/table1/details/${user._id}`} className={styles.details_btn}>Details</Link>
                      {user._id === loggedInUserId ? ( // Sprawdź, czy ID użytkownika w wierszu jest równe zalogowanemu ID
                            <><Link to={`/table1/edit/${user._id}`} className={styles.edit_btn}>Edit</Link>
                            <span className={styles.disabled_btn}>Nie możesz usunąć tego użytkownika</span></>
                        ) : (
                        <>
                        <span className={styles.disabled_btn}>Brak uprawnień do edycji</span>
                        <Link to={`/table1/delete/${user._id}`}  className={styles.delete_btn}>Delete</Link>
                        </>    
                    )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
      
};

export default Table1;
