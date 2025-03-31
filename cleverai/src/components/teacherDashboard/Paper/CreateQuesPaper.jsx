import React, { useState } from "react";
import { useParams } from "react-router-dom";
import "./CreateQuesPaper.css";
import Navbar from "../../navbar/Navbar";
import { useSelector, useDispatch } from "react-redux";
import { updateQuestion, updateAnswer } from "./../../../reduxFeatures/info/questionPaperSlice";

const CreateQuesPaper = () => {
  const dispatch = useDispatch();
  const questions = useSelector((state) => state.questionPaper.questions);
  const [error, setError] = useState(null);
  const { newPaper } = useParams(); // Extract paper title from URL
  const authToken = localStorage.getItem("authTokenTeach");
  const _id = useSelector((state) => state.classInfo.selectedClassId);

  const handleChange = (index, value, type) => {
    if (type === "question") {
      dispatch(updateQuestion({ index, value }));  // update questions in redux store
    } else {
      dispatch(updateAnswer({ index, value }));   // update answer in redux store
    }
  };

  const handleCreatePaper = async (e) => {
    e.preventDefault();
    if (newPaper.trim()){
      try{
          console.log(questions);
          console.log("Class ID:", _id);

          const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/tec/createPaper`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "auth-token": authToken,
            },
            body: JSON.stringify({ 
              title: newPaper,
              classId: _id,
              questions:questions // Redux-stored questions
            }),
          });

          if (!response.ok) {
            throw new Error("Failed to create Paper");
          }

          const newPaperResponse = await response.json();
          console.log(newPaperResponse);
        } catch (err) {
          setError(err.message);
          }
    }
  };

  return (
    <>
      <Navbar /> 
      <div className="question-paper-container">
        <h2>Question Paper: {newPaper}</h2>
        <hr />
        <form onSubmit={handleCreatePaper}>
          {questions.map((q, index) => (
            <div key={index} className="question-field">
              <label htmlFor={`ques-${index}`}>{`Question ${index + 1}:`}</label>
              <input
                id={`ques-${index}`}
                type="text"
                placeholder={`Question ${index + 1}`}
                value={q.question}
                onChange={(e) => handleChange(index, e.target.value, "question")}
              />
              <input
                type="text"
                placeholder={`Answer ${index + 1}`}
                value={q.answer}
                onChange={(e) => handleChange(index, e.target.value, "answer")}
              />
            </div>
          ))}
          <button className="submitBtn" type="submit">Submit</button>
        </form>
        {error && <p className="error-message">{error}</p>}
      </div>
    </>
  );
};

export default CreateQuesPaper;
