import React from 'react';
import './AiResponse.css'; // Importing the external CSS

function AiResponse({ aiResponse, onCancel }) {

  return (
    <div className="ai-response-overlay">
      <div className="ai-response-container">
        <h2 className="ai-response-title">Paper Submitted Successfully!</h2>
        <p className='ai-score'>Score :{aiResponse.score}</p>
        <hr style={{marginBottom: "20px",color:"gray"}}/>

        <div className="ai-response-details">
          {aiResponse?.responses.map((e, idx) => (
            <div key={idx} className="ai-response-card">
              <p className="ai-response-question-title">Question:</p>
              <p className="ai-response-question">{e.question}</p>
              <p className="ai-response-answer-title">Your Answer:</p>
              <p className="ai-response-answer">{e.answere}</p>
              <p className="ai-response-remark-title">AI Remark:</p>
              <p className={`ai-response-remark ${e.isCorrect ? "correct" : "incorrect"}`}>
                {e.isCorrect}
              </p>
            </div>
          ))}
        </div>

        <button onClick={onCancel} className="ai-response-close-btn">
          Close
        </button>
      </div>
    </div>
  );
}

export default AiResponse;
