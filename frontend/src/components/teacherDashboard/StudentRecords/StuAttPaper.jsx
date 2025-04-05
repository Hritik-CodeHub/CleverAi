import React from "react";
import Navbar from "../../navbar/Navbar";
import "./StuAttPaper.css";

const StuAttPaper = ({paper}) => {
    if (!paper || !paper.responses) {
    return (
        <>
        <Navbar />
        <div className="stuAttpaper-container">
            <h2 className="stuAttpaper-title"> Paper Not Found</h2>
            <p className="error-message">No responses available for this paper.</p>
        </div>
        </>
    );
    }
  const allQues = paper.responses;
  const  paperId = paper.paperId;
  const score=paper.score;
  const date=new Date(paper.attemptedAt).toLocaleDateString();

  return (
    <>
      <Navbar/> 
      <div className="stuAttpaper-container">
        <h2 className="stuAttpaper-title">Question Paper : {paperId}</h2>
        <p className="score-date">Score :{score}</p>
        <p className="score-date">Date :{date}</p>
        <hr style={{marginBottom: "20px",color:"gray"}}/>
        <form>
            {allQues.map((q, i) => (
                <div key={i} className="question-field">
                    <p id="ques">Question {i + 1}: {q.question}</p>
                    <p>Answer : {q.answere}</p>
                    <p >AiRemark : {q.isCorrect}</p>
                    <br />
                </div>
            ))}
        </form>
      </div>
    </>
  );
};

export default StuAttPaper;
