import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home"
import FeaturesPage from "./components/Features/FeaturesPage";
// import Features from "./Features";
import Login from "./components/login/Login";
import SignUp from "./components/signUp/SignUp";
import TeacherDashboard from "./teacherDashboard/TeacherDashboard";
import ClassPageWrapper from "./teacherDashboard/ClassPageWrapper"
import QuestionPaper from "./components/Paper/QuestionPaper";
import Alert from "./components/alert/alert";
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/teacherdash" element={<TeacherDashboard />} />
        <Route path="/features" element={<FeaturesPage/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp/>} />
        <Route path="/class/:className" element={<ClassPageWrapper />} />
        <Route path="/class/:newPaper/question-paper" element={<QuestionPaper />} />
      </Routes>
    </Router>
  );
};

export default App;
