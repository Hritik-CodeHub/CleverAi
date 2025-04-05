import React, { useState, useEffect } from "react";
import Navbar from "../../navbar/Navbar";
import StuAttPaper from "./StuAttPaper";
import { useParams } from "react-router-dom";

const StudentRecords = () => {
  const { _Id, stuId } = useParams();
  const [attmpPapr, setAttmpPapr] = useState([]);
  const [error, setError] = useState(null);
  const [selectedPaper, setSelectedPaper] = useState(null);
  const [loading, setLoading] = useState(true);
  const authToken = localStorage.getItem("authTokenTeach");
   if (!authToken) {
    setError("Authentication token is missing.");
    setLoading(false);
    return;
  }
  // Fetch all Papers
  const fetchPapers = async () => {
    setError(null);
    setLoading(true);
     
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/tec/allAttempedPaper`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": authToken,
        },
        body: JSON.stringify({ classId: _Id, userId: stuId }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch papers");
      }

      const data = await response.json();
     setAttmpPapr(data.attmpPapr);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPapers();
  }, [_Id, stuId]);

  const handlePaperClick = (paper) => {
    setSelectedPaper(paper);
  };

  return (
    <>
      <Navbar />
      <div className="all-papers-container">
        <div className="papers-content">
          <h1 className="dashboard-title">Student Records</h1>

          {loading && <p className="loading-text">Loading...</p>}
          {error && <p className="error-text">{error}</p>}

          {!loading && !error && attmpPapr.length === 0 && (
            <p className="no-papers-text">No papers found for this class.</p>
          )}

          {!selectedPaper ? (
            <div className="papers-grid">
              {attmpPapr.map((paper) => (
                <div
                  key={paper.paperId || paper._id}
                  className="paper-card"
                  onClick={() => handlePaperClick(paper)}
                >
                  <h3 className="paper-title">{paper.paperId}</h3>
                  <p className="paper-score">Score: {paper.score}</p>
                  <p className="paper-date">
                    Created: {new Date(paper.attemptedAt).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <StuAttPaper paper={selectedPaper} />
          )}
        </div>
      </div>
    </>
  );
};

export default StudentRecords;
