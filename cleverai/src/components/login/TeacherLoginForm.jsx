import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./LoginForm.css";
import "react-toastify/dist/ReactToastify.css";

export default function TeacherForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/tec/login`, {
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

      toast.success("Login Successfully");

      setTimeout(() => {
        navigate("/teacherdash");
      }, 2000);

      console.log("Login successful", data.authToken);
      
      // Storing the data in localStorage
      localStorage.setItem("authTokenTeach", data.authToken);
      localStorage.setItem("isTeach", "true"); // Should be stored as a string
      
    } catch (err) {
      toast.error("Oop's something went wrong!");
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 style={{ textAlign: "center" }}>Teacher Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="inputStyle"
          required
        />
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="inputStyle"
          required
        />
        <button type="submit" className="buttonStyle" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
      <div style={{ color: "black", display: "flex", alignItems: "center", marginTop: "10px" }}>
        <p style={{ marginRight: "5px" }}>Register Now</p>
        <Link className="link" to="/signup">Sign Up</Link>
      </div>
    </div>
  );
}
