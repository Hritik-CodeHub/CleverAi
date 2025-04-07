import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import './AllClasses.css';
import Navbar from "../../navbar/Navbar";
import { toast } from "react-toastify";

export default function AllClasses() {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refresh, setRefresh] = useState(false); //  added refresh state

  const authToken = localStorage.getItem("authToken");

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
  }, [refresh]); //  run useEffect again when refresh changes

  const handleJoinClass = async (classId) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/st/joinClass`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": authToken,
        },
        body: JSON.stringify({ classId }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("You successfully joined the class");
        setRefresh(prev => !prev); //  toggle refresh to trigger re-fetch
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error("Error joining class:", error);
      alert("Failed to join class. Please try again later.");
    }
  };

  return (
    <>
      <Navbar />
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
            <div key={classItem._id}>
              <div className="class-card">
                <h3 className="class-name">{classItem.name}</h3>
                <p className="class-teacher">Teacher ID: {classItem.teacher}</p>
                <p className="class-students">Total Students: {classItem.students.length}</p>
                <p className="class-date">
                  Created At: {new Date(classItem.createdAt).toLocaleDateString()}
                </p>
              </div>
              <button className="joinbtn" onClick={() => handleJoinClass(classItem._id)}>
                Join Class
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
