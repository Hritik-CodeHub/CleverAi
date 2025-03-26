import { useState } from "react";
import StuSignUpForm from "./StuSignUpForm";
import TeachSignUpForm from "./TeachSignUpForm";
import "./SignUp.css"
import Navbar from "../navbar/Navbar";
export default function SignUp() {
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
    <Navbar 
        //   linkText1="Home"
        //   linkText2="Features"
        //   linkText3="About Us"
        //   link1="/"
        //   link2="/features"
        //   link3="about-us"
          btn="Logout"
          btnNavLink="/"
        /> 

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

        <div>{userType === "student" ? <StuSignUpForm/> : <TeachSignUpForm />}</div>
      </div>
    </div>
    </>
  );
}
