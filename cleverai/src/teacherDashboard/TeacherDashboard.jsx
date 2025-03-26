import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css";
import Navbar from "../components/navbar/Navbar";
const TeacherDashboard = () => {
  const [classes, setClasses] = useState([
    { name: "Class A", students: ["Student 1", "Student 2"], papers: ["Paper 1", "Paper 2"] },
    { name: "Class B", students: ["Student 3", "Student 4","Student 5", "Student 6"], papers: ["Paper 3", "Paper 4"] },
    { name: "Class c", students: ["Student 4", "Student 6"], papers: ["Paper 3", "Paper 8"] },
    { name: "Class d", students: ["Student 5", "Student 7"], papers: ["Paper 3", "Paper 9"] },
  ]);
  const [newClass, setNewClass] = useState("");
  const navigate = useNavigate();

  const handleCreateClass = () => {
    if (newClass.trim()) {
      setClasses([...classes, { name: newClass, students: [], papers: [] }]);
      setNewClass("");
    }
  };

  return (
    <>
    <Navbar 
        //   linkText1="Home"
        //   linkText2="Features"
        //   linkText3="About Us"
        //   link1="/"
        //   link2="/features"
        //   link3="about-us"
          btn="Logout"
          btnNavLink="/"
        /> 
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

              {classes.map((cls, index) => (
                <li key={index} className="class-item" onClick={() => navigate(`/class/${cls.name}`)}>
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