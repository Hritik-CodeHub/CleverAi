import React, { useState } from "react";
import { useParams, useNavigate} from "react-router-dom";
import "./CreateQuesPaper.css";
import Navbar from "../../navbar/Navbar";
import { useSelector, useDispatch } from "react-redux";
import { updateQuestion, updateAnswer,resetQuestions} from "./../../../reduxFeatures/info/questionPaperSlice";
import { toast } from "react-toastify";
const CreateQuesPaper = () => {
  const dispatch = useDispatch();
  const questions = useSelector((state) => state.questionPaper.questions);
  const [error, setError] = useState(null);
  const { newPaper,_id} = useParams(); // Extract paper title from URL
  const navigate = useNavigate();
  const authToken = localStorage.getItem("authTokenTeach");
  if (!authToken) {
    setError("Authentication token is missing.");
    navigate("/login"); 
    return;
  }
  
  const handleChange = (index, value, type) => {
    if (type === "question") {
      dispatch(updateQuestion({ index, value }));  // update questions in redux store
    } else {
      dispatch(updateAnswer({ index, value }));   // update e in redux store
    }
  };
  
  const handleCreatePaper = async (e) => {
    e.preventDefault();
    if (!newPaper.trim()) {
      setError("Please enter a valid question paper title.");
      return;
    }
  
    const validQuestions = questions
      .filter(q => q.text.trim() && q.answere.trim())
      .map(q => ({ text: q.text, answere: q.answere })); 
  
    if (validQuestions.length === 0) {
      setError("Please add at least one valid question.");
      return;
    }
  
    try {
      console.log("Final Payload:", validQuestions);
  
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/tec/createPaper`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": authToken,
        },
        body: JSON.stringify({
          title: newPaper,
          classId: _id,
          questions: validQuestions,  
        }),
      });
  
      if (!response.ok) throw new Error("Failed to create Paper");
  
      toast.success("Question paper created successfully");
      dispatch(resetQuestions());  // Make sure `resetQuestions` exists in Redux
      navigate(`/teacherdash`);
    } catch (error) {
      setError(error.message || "An error occurred while creating the paper.");
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
                value={q.text}
                onChange={(e) => handleChange(index, e.target.value, "question")}
              />
              <input
                type="text"
                placeholder={`Answer ${index + 1}`}
                value={q.answere}
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
