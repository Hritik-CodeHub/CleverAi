import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ClassPage.css";
import Navbar from "../components/navbar/Navbar";

const ClassPage = ({ className }) => {
  const classes = [
    { name: "Class A", students: ["Student 1", "Student 2"], papers: ["Paper 1", "Paper 2"] },
    { name: "Class B", students: ["Student 3", "Student 4","Student 5", "Student 6"], papers: ["Paper 3", "Paper 4"] },
    { name: "Class c", students: ["Student 4", "Student 6"], papers: ["Paper 3", "Paper 8"] },
    { name: "Class d", students: ["Student 5", "Student 7"], papers: ["Paper 3", "Paper 9"] },
  ];
  const selectedClass = classes.find(cls => cls.name === className);
  const [view, setView] = useState("students");
  const [newPaper, setNewPaper] = useState("");
  const navigate = useNavigate();
    const handleCreatePaper = () => {
      if (newPaper.trim()) {
        navigate(`/class/${newPaper}/question-paper`);
        setNewPaper("");
      }
    };

  if (!selectedClass) {
    return <h2 className="error-message">Class not found</h2>;
  }

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
          <div className="class-container">
            <h2 className="class-title">Class: {selectedClass.name}</h2>
            <div className="sidebar">
            <button className={view === "students" ? "active" : ""} onClick={() => setView("students")}>Students</button>
            <button className={view === "papers" ? "active" : ""} onClick={() => setView("papers")}>Papers</button>
            </div>
            <div className="class-content">
              {view === "students" ? (
                <div className="card-container">
                  {selectedClass.students.map((student, i) => (
                    <div key={i} className="card">{student}</div>
                  ))}
                </div>
              ) : (
                <>
                {/* create new paper */}
                <div className=" card newPaper">
                <input
                    type="text"
                    placeholder="Enter Paper Name"
                    value={newPaper}
                    onChange={(e) => setNewPaper(e.target.value)}
                    className="class-input"
                 />
                  <button className="create-paper-button" onClick={handleCreatePaper}>
                   Create New Paper
                  </button>
                 </div>
                 <div className="card-container">
                      {selectedClass.papers.map((paper, i) => (
                      <div key={i} className="card">{paper}</div>
                      ))}
                  </div>
                </>)}
            </div>
          </div>
        </>);
};
export default ClassPage;