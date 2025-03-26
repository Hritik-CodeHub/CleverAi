import React, { useState } from "react";
import { useParams } from "react-router-dom";
import "./QuestionPaper.css";
import Navbar from "../navbar/Navbar";

const QuestionPaper = () => {
  const [questions, setQuestions] = useState(Array(10).fill(""));
  const [answers, setAnswers] = useState(Array(10).fill(""));
  const { newPaper } = useParams(); // Extract class name from URL
  const handleChange = (index, value, type) => {
    if (type === "question") {
      const newQuestions = [...questions];
      newQuestions[index] = value;
      setQuestions(newQuestions);
    } else {
      const newAnswers = [...answers];
      newAnswers[index] = value;
      setAnswers(newAnswers);
    }
  };

  return (
    <>
    <Navbar 
        //   linkText1="Home"
        //   linkText2="Features"
        //   linkText3="About Us"
        //   link1="/"
        //   link2="/features"
        //   link3="about-us"
          btn="Back"
          btnNavLink="/"
        /> 
    <div className="question-paper-container">
      <h2>Question Paper {newPaper}</h2>
      <form>
        {questions.map((q, index) => (
          <div key={index} className="question-field">
            <input
              type="text"
              placeholder={`Question ${index + 1}`}
              value={questions[index]}
              onChange={(e) => handleChange(index, e.target.value, "question")}
            />
            <input
              type="text"
              placeholder={`Answer ${index + 1}`}
              value={answers[index]}
              onChange={(e) => handleChange(index, e.target.value, "answer")}
            />
          </div>
        ))}
        <button className="submitBtn"type="submit">Submit</button>
      </form>
    </div>
    </>);
};

export default QuestionPaper;
