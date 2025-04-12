import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import TestComponent from "./TestComponent";
import './AllPaper.css';  // Importing the external CSS
import Navbar from "../../navbar/Navbar";
import Loading from "../../Loading/Loading";
function AllPaper() {
  const { classId } = useParams();
  const [papers, setPapers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPaper, setSelectedPaper] = useState(null);
  const [activeQuestion, setActiveQuestion] = useState(null);

  useEffect(() => {
    const fetchPapers = async () => {
      if (!classId) {
        setError("Invalid class ID.");
        setLoading(false);
        return;
      }

      const authToken = localStorage.getItem("authToken");
      if (!authToken) {
        setError("Authentication token is missing.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/st/allPapers`,
          { classId },
          {
            headers: {
              "Content-Type": "application/json",
              "auth-token": authToken,
            },
          }
        );

        if (response.data.success) {
          setPapers(response.data.allClassPapers);
        } else {
          setError("Oops! This class does not exist or try again later.");
        }
      } catch {
        setError("Error fetching data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchPapers();
  }, [classId]);

  const handlePaperClick = (paper) => {
    setSelectedPaper(paper);
    setActiveQuestion(null);
  };

  return (<>
    <Navbar/>
    {loading && <Loading />}
    <div className="all-papers-container">
      <div className="papers-content">
        <h2 className="title">
          {selectedPaper ? selectedPaper.title : "All Papers"}
        </h2> 
        {error && <p className="error-text">{error}</p>}

        {!loading && !error && papers.length === 0 && (
          <p className="no-papers-text">
            No papers found for this class.
          </p>
        )}

        {!selectedPaper ? (
          <div className="papers-grid">
            {papers.map((paper, idx) => (
              <div
                key={idx}
                className="paper-card"
                onClick={() => handlePaperClick(paper)}
              >
                <h3 className="paper-title">{paper.title}</h3>
                <p className="paper-date">
                  Created: {new Date(paper.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div>
            {!activeQuestion && (
              <TestComponent
                classId={classId}
                paper={selectedPaper} // Pass selected paper to TestComponent
                onBack={() => setSelectedPaper(null)}
              />
            )}
          </div>
        )}
      </div>
    </div>
  </>);
}

export default AllPaper;
