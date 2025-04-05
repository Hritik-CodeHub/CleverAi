import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./TeacherDashboard.css";
import Navbar from "../navbar/Navbar";
import { toast } from "react-toastify";

const TeacherDashboard = () => {
  const [classes, setClasses] = useState([]);
  const [newClass, setNewClass] = useState("");
  const [loading, setLoading] = useState(false);
  const [creatingClass, setCreatingClass] = useState(false);
  const navigate = useNavigate();

  const authToken = localStorage.getItem("authTokenTeach");
  const isTeach = JSON.parse(localStorage.getItem("isTeach") || "false");

  useEffect(() => {
    if (!isTeach) {
      navigate("/login");
    }
  }, [isTeach, navigate]);

  // Fetch all classes
  const fetchClasses = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/tec/allExstClasses`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": authToken,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch classes");
      }

      const data = await response.json();
      setClasses(data.allClasses);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  }, [authToken]);

  useEffect(() => {
    fetchClasses();
  }, [fetchClasses]);

  // Create a new class
  const handleCreateClass = async () => {
    if (!newClass.trim()) {
      toast.warn("Classroom name cannot be empty!");
      return;
    }

    setCreatingClass(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/tec/createClass`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": authToken,
        },
        body: JSON.stringify({ className: newClass }),
      });

      if (!response.ok) {
        throw new Error("Failed to create class");
      }

      const newClassResponse = await response.json();
      setClasses((prevClasses) => [...prevClasses, newClassResponse]);
      setNewClass(""); 
      fetchClasses();
    } catch (err) {
      toast.error(err.message);
    } finally {
      setCreatingClass(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="teacher-dashboard">
        <h2 className="dashboard-title">Teacher Dashboard</h2>
        <h2 className="title">
          <span className="header-span">All Classes</span>
        </h2>

        <div className="dashboard-content">
          <div className="class-list">
            {/* Create Class */}
            <div className="class-creation-card">
              <input
                type="text"
                placeholder="Enter Classroom Name"
                value={newClass}
                onChange={(e) => setNewClass(e.target.value)}
                className="class-input"
                disabled={creatingClass}
              />
              <button
                className="create-class-button"
                onClick={handleCreateClass}
                disabled={creatingClass}
              >
                {creatingClass ? "Creating..." : "Create New Class"}
              </button>
            </div>

            {/* Loading Indicator */}
            {loading ? (
              <p>Loading classes...</p>
            ) : classes.length > 0 ? (
              classes.map((cls,i) => (
                <Link to={`/teacher/${cls.name}/${cls._id}`} key={cls._id || i} >
                  <div  className="classes-card">
                <h3 className="classname">{cls.name}</h3>
                <p className="class-teacher">
                  <strong>Teacher:</strong> {cls.teacher}
                </p>
                <p className="classes-students">
                  <strong>Students:</strong> {cls.students.length}
                </p>
                <p className="classes-papers">
                  <strong>Papers:</strong> {cls.papers.length}
                </p>
              </div></Link>
              ))
            ) : (
              <p>No classes found. Create one above.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default TeacherDashboard;
