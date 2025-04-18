import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AllAttemptedPaper.css";
import Navbar from "../../navbar/Navbar";
import Loading from "../../Loading/Loading";

function AllAttemptedPaper() {
  const [allAttemptedPapers, setAllAttemptedPapers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPaper, setSelectedPaper] = useState(null); // Track selected paper

  useEffect(() => {
    const fetchAttemptedPapers = async () => {
      const authToken = localStorage.getItem("authToken");
      if (!authToken) {
        setError("Authentication token is missing.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/st/allAtmptPapers`,
          {
            headers: {
              "Content-Type": "application/json",
              "auth-token": authToken,
            },
          }
        );

        if (response.data && response.data.allPapers) {
          setAllAttemptedPapers(response.data.allPapers.history || []);
        } else {
          setError("Invalid response structure.");
        }
      } catch (error) {
        setError("Failed to fetch attempted papers.");
        console.error("Error fetching papers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAttemptedPapers();
  }, []);
  
  return (<>
    <Navbar/>
    {loading && <Loading />}
    <div>
      <h2>All Attempted Papers</h2>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && !error && allAttemptedPapers.length === 0 && <p>No papers attempted yet.</p>}

      {!loading && !error && allAttemptedPapers.length > 0 && (
        <div className="paper-container">
          {allAttemptedPapers.map((attempt) => (
            <div
              key={attempt._id}
              className="paper-card"
              onClick={() => setSelectedPaper(attempt)}
            >
              <h3>Paper ID: {attempt.paperId}</h3>
              <p><strong>Class ID:</strong> {attempt.classId}</p>
              <p><strong>Score:</strong> {attempt.score}</p>
              <p><strong>Attempted At:</strong> {new Date(attempt.attemptedAt).toLocaleString()}</p>
            </div>
          ))}
        </div>
      )}

      {/* Popup Modal */}
      {selectedPaper && (
        <div className="modal-overlay" onClick={() => setSelectedPaper(null)}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <h3 className="resp-title">Responses:</h3>
          <p className="ai-score">Score :{selectedPaper.score}</p>
          <hr />
          <ul className="response-list">
            {selectedPaper.responses.map((response,i) => (
              <li key={response._id} className="response-item">
                <p><strong>Q {i+1}: </strong> {response.question}</p>
                <p><strong>Your Answer:</strong> {response.answere}</p>
                <p><strong>Feedback:</strong> {response.isCorrect}</p>
              </li>
            ))}
          </ul>
          <button className="close-btn" onClick={() => setSelectedPaper(null)}>Close</button>
        </div>
      </div>
      
      )}
    </div>
  </>);
}

export default AllAttemptedPaper;
