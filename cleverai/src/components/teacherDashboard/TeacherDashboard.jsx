import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./TeacherDashboard.css";
import { useDispatch } from "react-redux";
import { setClassId } from "../../reduxFeatures/info/ClassInfoSlice"; // Import action
import Navbar from "../navbar/Navbar";
const TeacherDashboard = () => {
  const [classes, setClasses] = useState([]);
  const [newClass, setNewClass] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch(); // Use Redux dispatch
  const authToken = localStorage.getItem("authTokenTeach");
  const isTeach = localStorage.getItem("isTeach");
  console.log(authToken);
  // Prevents unauthorized access 
  useEffect(() => {
      if (!isTeach) {
        navigate("/login");
      }
    }, [isTeach, navigate]);
  
  // featch all classes
  const [error, setError] = useState(null);
  const fetchClasses = async () => {
    setError(null);
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
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchClasses();
  },[]);

  // Create new class
  const handleCreateClass = async () => {
    if (newClass.trim()) {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/tec/createClass`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token": authToken,
          },
          body: JSON.stringify({ className : newClass }),
        });
        if (!response.ok) {
          throw new Error("Failed to create class");
        }
        const newClassResponse = await response.json();
        setClasses((prevClasses) => [...prevClasses, newClassResponse]); // Add the new class to the state
        fetchClasses();
        setNewClass(""); // Clear the input after creation
      } catch (err) {
        setError(err.message);
      }
    }
  };

  return (
     <>
      <Navbar /> 
      <div className="dashboard-container">
        <h2 className="dashboard-title">Teacher Dashboard</h2>
        <div className="dashboard-content">
          <div>
            <ul className="class-list">
            <div className="class-creation class-item ">
              <input
                type="text"
                placeholder="Enter Classroom Name"
                value={newClass}
                onChange={(e) => setNewClass(e.target.value)}
                className="class-input"
              />
              <button className="create-class-button" onClick={handleCreateClass}>
                Create New Class
              </button>
            </div>
          {/* All Existing classes */}
            {classes.map((cls,index) => (
              <li key={index} className="class-item"
                onClick={() =>{dispatch(setClassId(cls._id));
                navigate(`/class/${cls.name}`)}}>
              {cls.name}
              </li>
            ))}
          </ul>
          </div>
        </div>
      </div>
  </>);
  };

export default TeacherDashboard;