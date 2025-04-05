import { useState } from "react";
import StudentLoginForm from "./StudentLoginForm";
import TeacherLoginForm from "./TeacherLoginForm";
import "./Login.css"
import Navbar from "../navbar/Navbar";
export default function Login() {
  const [userType, setUserType] = useState("student");
  const cardStyle = {
    alignItems: "center",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
    width: "350px",
    height:"400px",
    btnNavLink:"/"
  };

  const buttonContainer = {
    display: "flex",
    justifyContent: "space-around",
    marginBottom: "10px",
  };

  const activeButton = {
    flex: "1",
    padding: "10px",
    backgroundColor: "#ff5722", // Orange
    color: "white",
    border: "none",
    cursor: "pointer",
    borderRadius: "0px",
  };

  const inactiveButton = {
    flex: "1",
    padding: "10px",
    backgroundColor: "#E0E0E0", // Gray
    border: "none",
    cursor: "pointer",
    borderRadius: "0px",
  };

  return (
    <>
    <Navbar btn="Back" btnNavLink="/"/>
    <div className="fornContainer">
      <div style={cardStyle}>
        <div style={buttonContainer}>
          <button
            style={userType === "student" ? activeButton : inactiveButton}
            onClick={() => setUserType("student")}
          >
            Student
          </button>
          <button
            style={userType === "teacher" ? activeButton : inactiveButton}
            onClick={() => setUserType("teacher")}
          >
            Teacher
          </button>
        </div>

        <div>{userType === "student" ? <StudentLoginForm /> : <TeacherLoginForm />}</div>
      </div>
    </div>
    </>
  );
}
