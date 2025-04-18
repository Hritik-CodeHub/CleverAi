import React, { useState, useEffect } from "react";
import AiResponse from "./AiResponse";
import './TestComponent.css';
import { toast } from "react-toastify";
import Loading from "../../Loading/Loading";
function TestComponent({ classId, paper, onBack }) {
  const [startPaper, setStartPaper] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60); // 1-minute countdown
  const [isRunning, setIsRunning] = useState(false);
  const [aiResponse, setAiResponse] = useState(null);

  const [answers, setAnswers] = useState(
    paper?.questions ? Array(paper.questions.length).fill("not provided") : []
  );

  useEffect(() => {
    if (!classId || !paper?._id) {
      setError("Class ID or Paper ID is missing.");
    }
  }, [classId, paper?._id]);

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(timer);
    }
    if (timeLeft === 0) {
      alert("Time Up!");
      setIsRunning(false);
      handleSubmit();
    }
  }, [isRunning, timeLeft]);

  useEffect(() => {
    console.log("AI Response:", aiResponse?.responses);
  }, [aiResponse]);

  const startCountdown = () => {
    setStartPaper(true);
    setTimeLeft(480);
    setIsRunning(true);
  };

  const handleChange = (idx, value) => {
    setAnswers((prev) => {
      const updatedAnswers = [...prev];
      updatedAnswers[idx] = { answere: value };
      return updatedAnswers;
    });
  };

  const handleSubmit = async () => {
    setLoading(true);
    setIsRunning(false);
   console.log(answers)
    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
      setError("Authentication token is missing.");
      alert("You need to log in.");
      setLoading(false);
      return;
    }

    const payload = {
      classId,
      paperId: paper._id,
      answeres: answers, // Keeping "answeres" as per API requirement
    };

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/st/answeres`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": authToken,
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      const aiRes = data.paper.history[data.paper.history.length - 1];
      setAiResponse(aiRes);

      if (response.ok) {
        setShowSuccess(true);
      } else {
          const errorMsg = "Failed to submit the paper.";
          setError(errorMsg);
          toast.error(errorMsg);
      }
    } catch (error) {
          console.error("Submission Error:", error);
          const errMsg = "Network error. Please try again.";
          setError(errMsg);
          toast.error(errMsg);
    } finally {
      setLoading(false);
    }
  };

  if (!startPaper) {
    return (
      <div className="test-component-container">
        <div className="confirmation-container">
          <h1 className="confirmation-heading">Are you ready to start the paper?</h1>
          <button
            className="start-button"
            onClick={startCountdown}
          >
            Yes, Start Paper
          </button>
          <button
            className="back-button"
            onClick={onBack}
          >
            No
          </button>
        </div>
      </div>
    );
  }

  return (<>
    {loading && <Loading />}
    <div className="test-paper-container">
      {error && <p className="error-message">{error}</p>}

      {/* Timer */}
      <div className="timer-container">
        <div className="time-left">
          <span className="time-label">Time Left:</span>
          <span className="time-value">
            {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, "0")}
          </span>
        </div>
      </div>

      {/* Questions */}
      <div className="questions-container">
        {paper?.questions?.map((ques, idx) => (
          <div key={ques.id} className="question-item">
            <p className="question-text">Q {idx+1}: {ques.text}</p>
            <input
              type="text"
              placeholder="Type Your Answer"
              className="answer-input"
              onChange={(e) => handleChange(idx, e.target.value)}
            />
          </div>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="action-buttons">
        <button
          onClick={handleSubmit}
          className="submit-button"
        >
          {loading ? "Submitting..." : "Submit Paper"}
        </button>
        <button 
          onClick={onBack}
          className="back-button"
        >
          Back
        </button>
      </div>

      {/* Success Message */}
      {showSuccess && (
        <div className="overlay">
          <AiResponse
            onCancel={() => {
              setShowSuccess(false);
              onBack();
            }}
            aiResponse={aiResponse}
          />
        </div>
      )}
    </div>
  </>);
}

export default TestComponent;
