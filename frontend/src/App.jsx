import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home"
import FeaturesPage from "./components/features/FeaturesPage";
import Login from "./components/login/Login";
import SignUp from "./components/signUp/SignUp";
import TeacherDashboard from "./components/teacherDashboard/TeacherDashboard";
import StudentDashboard from "./components/student/StudentDashboard";
import ClassPageWrapper from "./components/teacherDashboard/ClassPageWrapper"
import CreateQuesPaper from "./components/teacherDashboard/Paper/CreateQuesPaper";
import QuesPaper from "./components/teacherDashboard/Paper/QuesPaper";
import AllPaper from "./components/student/studentSubComponent/AllPaper";
import { ToastContainer, toast } from 'react-toastify';
import StudentRecords from "./components/teacherDashboard/StudentRecords/StudentRecord";
const App = () => {
  return (
    <Router>
       <ToastContainer 
        position="top-right"
        autoClose={3000} 
        hideProgressBar={false} 
        newestOnTop={false} 
        closeOnClick 
        rtl={false}
        pauseOnFocusLoss 
        draggable 
        pauseOnHover
      />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/signup" element={<SignUp/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/teacherdash" element={<TeacherDashboard/>} />
        <Route path="/student" element={<StudentDashboard/>} />
        <Route path="/student/class/:classId" element={<AllPaper/>}/>
        <Route path="/features" element={<FeaturesPage/>} />
        <Route path="/teacher/:className/:_id" element={<ClassPageWrapper />} />
        <Route path="/class/:newPaper/:_id/question-paper" element={<CreateQuesPaper />} />
        <Route path="/class/:classId/:indx" element={<QuesPaper />} />
        <Route path="/teacher/class/:_Id/:stuId" element={<StudentRecords />} />
      </Routes>
    </Router>
  );
};

export default App;
