import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import "./SignUpForm.css";
export default function TeachSignUpForm() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const navigate = useNavigate()
  const handleSignup = async (e) => {
      e.preventDefault();
      setLoading(true);
      setError(null);

  try {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/tec/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password ,name }),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Login failed");
    }
    toast.success("Login Successfully")
    setTimeout(() => {
      navigate("/teacherdash")
    }, 3000);
    // dispatch(login(data.authToken));
    
    
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
        <h2 style={{ textAlign: "center" }}>Teacher SignUp</h2>
        <form onSubmit={handleSignup}>
        <input type="name"  onChange={(e) => setName(e.target.value)}  placeholder="Name" className="inputStyle" />
        <input type="email"  onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="inputStyle" />
        <input type="password"  onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="inputStyle" />
        <button type="submit" className="buttonStyle">{
        loading ? ("Loading..."):("SignUp")
        }</button></form>
        <div style={{color:"black", display:"flex", alignItems:"center",marginTop:"10px" }}>
          <p style={{marginRight:"5px"}}>Already have account ?</p>
          <Link className="link"to="/login" >Log in</Link>
        </div>
      </div>
    );
  }
  