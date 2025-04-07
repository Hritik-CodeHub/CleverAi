import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./CreateQuesPaper.css";
import Navbar from "../../navbar/Navbar";
import "./QuesPaper.css";

const QuesPaper = () => {
  const [allQues, setAllQues] = useState([]);
  const [error, setError] = useState(null);
  const { classId, indx } = useParams();
  const index = parseInt(indx, 10); // Convert indx to a number
  const authToken = localStorage.getItem("authTokenTeach");
  if (!authToken) {
    setError("Authentication token is missing.");
    navigate("/login"); 
    return;
  }
  
  useEffect(() => {
    const fetchPaper = async () => {
      setError(null);
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/tec/allPapers`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token": authToken,
          },
          body: JSON.stringify({ classId }),
        });

        if (!response.ok) {
          throw new Error("Failed to fetch papers");
        }

        const data = await response.json();
        if (data.allClassPapers[index]) {
          setAllQues(data.allClassPapers[index].questions);
        } else {
          setError("Paper not found");
        }
      } catch (err) {
        setError(err.message);
      }
    };

    fetchPaper();
  }, []);

  return (<>
      <Navbar/> 
      <div className="question-paper-container">
        <h2>Question Paper</h2>
        <hr style={{marginBottom: "20px",color:"gray"}}/>
        {error ? (
          <h2 className="error-message">{error}</h2>
        ) : (
          <div>
            {allQues.map((q, i) => (
              <div key={i} className="question-field">
                <p id="ques">Question {i + 1}: {q.text}</p>
                <p>Answer {i + 1}: {q.answere}</p>
                <br />
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default QuesPaper;
