import { Link } from "react-router-dom";
import { useNavigate  } from "react-router-dom";
import { useState } from "react";
import "./LoginForm.css";
import { toast } from 'react-toastify';

export default function StudentForm() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
 
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/st/loginUser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }
      toast.success("Login Successfully")
      setTimeout(() => {
        navigate("/student")
      }, 3000);
      
      console.log("Login successful", data.authToken);
      localStorage.setItem("authToken", data.authToken);
      localStorage.setItem("isAuthenticated", true);
      
      // Handle success (e.g., store token, redirect, etc.)
    } catch (err) {
      toast.error("Oop's something went wrong!")
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

    return (
      <div>
        <h2 style={{ textAlign: "center" }}>Student Login</h2>
        <form onSubmit={handleLogin}>
        <input type="email" onChange={(e) => setEmail(e.target.value)}  placeholder="Email" className="inputStyle" />
        <input onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" className="inputStyle" />
        <button type="submit" className="buttonStyle">{
      loading?("Loging..."):("Login")
      }</button>
        </form><div style={{color:"black", display:"flex", alignItems:"center",marginTop:"10px" }}>
          <p style={{marginRight:"5px"}}>Register Now</p>
          <Link className="link" to="/signup" >Sign Up</Link>
        </div>
      </div>
    );
  }
  