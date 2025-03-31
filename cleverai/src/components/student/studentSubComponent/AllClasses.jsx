import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import './AllClasses.css';  // Importing the external CSS
import Navbar from "../../navbar/Navbar";
export default function AllClasses() {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const authToken = localStorage.getItem("authToken");
        if (!authToken) {
          throw new Error("Authentication token missing. Please log in.");
        }

        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/st/allClasses`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "auth-token": authToken,
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch classes: ${response.statusText}`);
        }

        const data = await response.json();
        if (!data.success) {
          throw new Error(data.message || "Failed to fetch classes");
        }

        setClasses(data.classes);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchClasses();
  }, []);

  return (<>
    <Navbar/>
    <div className="all-classes-container">
      <h2 className="title">
        <span className="header-span">All Classes</span>
      </h2>

      {loading && <p className="loading-text">Loading classes...</p>}

      {error && <p className="error-text">{error}</p>}

      {classes.length === 0 && !loading && !error && (
        <p className="no-classes-text">No classes available.</p>
      )}

      <div className="classes-grid all-classes">
        {classes.map((classItem) => (
          <Link to={`/student/class/${classItem._id}`} key={classItem._id} >
            <div className="class-card">
              <h3 className="class-name">{classItem.name}</h3>
              <p className="class-teacher">Teacher ID: {classItem.teacher}</p>
              <p className="class-students">Total Students: {classItem.students.length}</p>
              <p className="class-date">
                Created At: {new Date(classItem.createdAt).toLocaleDateString()}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
    </>);
}
