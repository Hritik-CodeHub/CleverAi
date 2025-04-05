import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AllClasses from "./studentSubComponent/AllClasses";
import AllEnrolledClasses from "./studentSubComponent/AllEnrolledClasses";
import AllAttemptedPaper from "./studentSubComponent/AllAttemptedPaper";
import "./StudentDashboard.css";

function StudentDashboard() {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem("isAuthenticated");
  const [activeTab, setActiveTab] = useState("all"); // "all", "enrolled", "attempted"

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="student-dashboard">
      <h2 className="heading">Student Dashboard</h2>

      {/* Toggle Buttons */}
      <div className="toggle-buttons">
        <button
          className={activeTab === "all" ? "active" : ""}
          onClick={() => setActiveTab("all")}
        >
          All Classes
        </button>
        <button
          className={activeTab === "enrolled" ? "active" : ""}
          onClick={() => setActiveTab("enrolled")}
        >
          Enrolled Classes
        </button>
        <button
          className={activeTab === "attempted" ? "active" : ""}
          onClick={() => setActiveTab("attempted")}
        >
          All Attempted Papers
        </button>
      </div>

      {/* Show Content Based on Active Tab */}
      <div className="classes-container">
        {activeTab === "all" && <AllClasses />}
        {activeTab === "enrolled" && <AllEnrolledClasses />}
        {activeTab === "attempted" && <AllAttemptedPaper />}
      </div>
    </div>
  );
}

export default StudentDashboard;
