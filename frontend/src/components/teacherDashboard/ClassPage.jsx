import React, { useState, useEffect } from "react";
import "./ClassPage.css";
import Navbar from "../navbar/Navbar";
import { useNavigate, Link } from "react-router-dom";

const StudentCard = ({ student, classId }) => (
  <Link to={`/teacher/class/${classId}/${student._id}`} className="stu-card" key={classId}>
    <h3 className="stu-title">Student: {student.name}</h3>
    <p className="stu-id">Id: {student._id}</p>
  </Link>
);

const PaperCard = ({ paper, classId, index, navigate }) => (
  <div
    key={paper._id}
    className="paper-card"
    onClick={() => navigate(`/class/${classId}/${index}`)}
  >
   <h3 className="paper-title">{paper.title}</h3>
    <p className="paper-date">
      Created: {new Date(paper.createdAt).toLocaleDateString()}
    </p>
  </div>
);

const ClassPage = ({ className, _id }) => {
  const [papers, setPapers] = useState([]);
  const [view, setView] = useState("students");
  const [allStudents, setAllStudents] = useState([]);
  const [newPaper, setNewPaper] = useState("");
  const [error, setError] = useState(null);
  const [loadingStudents, setLoadingStudents] = useState(false);
  const [loadingPapers, setLoadingPapers] = useState(false);

  const navigate = useNavigate();
  const authToken = localStorage.getItem("authTokenTeach");

  // Navigate to create new paper page
  const handleCreatePaper = () => {
    if (newPaper.trim()) {
        navigate(`/class/${newPaper}/${_id}/question-paper`);
        setNewPaper("");
    }
  };

  // Fetch all Papers
  const fetchPapers = async () => {
    setError(null);
    setLoadingPapers(true);
    try {
      if (!authToken) {
        throw new Error("Authentication token missing. Please log in.");
      }
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/tec/allPapers`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": authToken,
        },
        body: JSON.stringify({ classId: _id }),
      });

      if (!response.ok) throw new Error("Failed to fetch papers");

      const data = await response.json();
      setPapers(data.allClassPapers);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoadingPapers(false);
    }
  };

  // Fetch all Students
  const fetchAllStudents = async () => {
    setError(null);
    setLoadingStudents(true);
    try {
      if (!authToken) {
        throw new Error("Authentication token missing. Please log in.");
      }
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/tec/allStudents`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": authToken,
        },
        body: JSON.stringify({ classId: _id }),
      });

      if (!response.ok) throw new Error("Failed to fetch students");

      const data = await response.json();
      setAllStudents(data.students);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoadingStudents(false);
    }
  };

  useEffect(() => {
    if (_id) fetchAllStudents();
  }, [_id]);

  useEffect(() => {
    if (view === "papers") fetchPapers();
  }, [view]);

  return (
    <>
      <Navbar />
      <h2 className="class-title">Class: {className}</h2>

      {/* Toggle Buttons */}
      <div className="toggle-btn">
        <button className={view === "students" ? "active" : ""} onClick={() => setView("students")}>
          Students
        </button>
        <button className={view === "papers" ? "active" : ""} onClick={() => setView("papers")}>
          Papers
        </button>
      </div>

      <div className="class-container">
        <div className="class-content">
          {/* Error Display */}
          {error && <div className="error-banner">{error}</div>}

          {view === "students" ? (
            // Students View
            <div className="card-container">
              {loadingStudents ? (
                <p style={{ color: "grey" }}>Loading students...</p>
              ) : allStudents.length === 0 ? (
                <h1 style={{ color: "grey" }}>No Enrolled Students</h1>
              ) : (
                allStudents.map((student) => (
                  <StudentCard key={student._id} student={student} classId={_id} />
                ))
              )}
            </div>
          ) : (
            // Papers View
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
                  <button
                    className="create-paper-button"
                    onClick={handleCreatePaper}
                    disabled={!newPaper.trim()}
                  >
                    Create New Paper
                  </button>
                </div>

                {/* Display Papers */}
                {loadingPapers ? (
                  <p style={{ color: "grey" }}>Loading papers...</p>
                ) : papers.length === 0 ? (
                  <p style={{ color: "grey", textAlign: "center" }}>No papers found. Create one above!</p>
                ) : (
                  papers.map((paper, i) => (
                    <PaperCard key={paper._id} paper={paper} classId={_id} index={i} navigate={navigate} />
                  ))
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
