import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home"
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";
import TeacherDashboard from "./pages/TeacherDashboard/TeacherDashboard";
import StudentDashboard from "./pages/StudentDashboard/StudentDashboard";
import ClassPage from "./components/teacher/ClassPage/ClassPage";
import CreateQuesPaper from "./components/teacher/CreateQuesPaper/CreateQuesPaper";
import QuesPaper from "./components/teacher/QuesPaper/QuesPaper";
import AllPaper from "./components/student/AllPaper/AllPaper";
import { ToastContainer, toast } from 'react-toastify';
import StudentRecords from "./components/teacher/StudentRecords/StudentRecord";
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
        <Route path="/teacher/:className/:_id" element={<ClassPage />} />
        <Route path="/class/:newPaper/:_id/question-paper" element={<CreateQuesPaper/>} />
        <Route path="/class/:classId/:indx" element={<QuesPaper/>} />
        <Route path="/teacher/class/:_Id/:stuId" element={<StudentRecords/>} />
      </Routes>
    </Router>
  );
};

export default App;
