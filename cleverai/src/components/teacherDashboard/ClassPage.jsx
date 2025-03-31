import React, { useState, useEffect } from "react";
import "./ClassPage.css";
import Navbar from "../navbar/Navbar";
import { useNavigate } from "react-router-dom";

const ClassPage = ({ className, _id }) => {
  const [papers, setPapers] = useState([]);
  const [view, setView] = useState("students");
  const [allStudents, setAllStudents] = useState([]);
  const [newPaper, setNewPaper] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const authToken = localStorage.getItem("authTokenTeach");

  // Navigate to create new paper page
  const handleCreatePaper = () => {
    if (newPaper.trim()) {
      navigate(`/class/${newPaper}/question-paper`);
      setNewPaper("");
    }
  };

  // Fetch all Papers
  const fetchPapers = async () => {
    setError(null);
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/tec/allPapers`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": authToken,
        },
        body: JSON.stringify({ classId: _id }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch papers");
      }

      const data = await response.json();
      setPapers(data.allClassPapers);
    } catch (err) {
      setError(err.message);
    }
  };

  // Fetch all Students
  const fetchAllStudents = async () => {
    setError(null);
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/tec/allStudents`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": authToken,
        },
        body: JSON.stringify({ classId: _id }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch students");
      }

      const data = await response.json();
      console.log(data.students);
      setAllStudents(data.students);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchAllStudents();
  }, []);

  useEffect(() => {
    if (view === "papers") {
      fetchPapers();
    }
  }, [view]);

  return (
    <>
      <Navbar btn="Logout" btnNavLink="/" />
      <div className="class-container">
        <h2 className="class-title">Class: {className}</h2>
        <div className="sidebar">
          <button className={view === "students" ? "active" : ""} onClick={() => setView("students")}>
            Students
          </button>
          <button className={view === "papers" ? "active" : ""} onClick={() => setView("papers")}>
            Papers
          </button>
        </div>
        <div className="class-content">
          {error && <h2 className="error-message">{error}</h2>}
          {view === "students" ? (
            <div className="card-container">
              {allStudents.length === 0 && <h1 style={{color:"grey"}}>No Enrolled Students</h1>}
              {allStudents.map((student, i) => (
                <div key={i} className="card">{student.name}</div>
              ))}
            </div>
          ) : (
            <>
              <div className="card-container">
                {/* Create new paper */}
                <div className="card create-newPaper">
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
                {/* Display Papers */}
                {papers.length > 0 ? (
                  papers.map((paper, i) => (
                    <div key={i} className="card" onClick={() => navigate(`/class/${_id}/${i}`)}>
                      {paper.title}
                    </div>
                   ))
                 ) : (
                  <h2 style={{ color: "grey"}} className="error-message">
                    No Papers Found
                  </h2>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default ClassPage;
