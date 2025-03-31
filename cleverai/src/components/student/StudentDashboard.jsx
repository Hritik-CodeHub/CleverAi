import React, { useEffect } from "react";
import AllClasses from "./studentSubComponent/AllClasses";
import { useNavigate } from "react-router-dom";
import "./StudentDashboard.css"
function StudentDashboard() {
  const navigate = useNavigate();
  const authToken = localStorage.getItem("authToken");
  const isAuthenticated = localStorage.getItem("isAuthenticated");

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="student-dashboard">
      <h2 className="heading">Student Dashboard</h2>
      <div className="classes-container">
        <AllClasses />
      </div>
    </div>
  );
}

export default StudentDashboard;
