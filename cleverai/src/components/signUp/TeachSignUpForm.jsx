import { Link } from "react-router-dom";
export default function TeachSignUpForm() {
    const inputStyle = {
      width: "100%",
      padding: "10px",
      marginBottom: "10px",
      marginTop:"20px",
      border: "1px solid #ccc",
      borderRadius: "5px",
      boxSizing: "border-box",
      backgroundColor:"white"
    };
  
    const buttonStyle = {
      width: "100%",
      padding: "10px",
      backgroundColor: "#ff5722",
      marginTop:"20px",
      color: "white",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
    };
  
    return (
      <div>
        <h2 style={{ textAlign: "center" }}>Teacher SignUp</h2>
        <input type="Nane"  placeholder="name" style={inputStyle} />
        <input type="email" placeholder="Email" style={inputStyle} />
        <input type="password" placeholder="Password" style={inputStyle} />
        <button style={buttonStyle}>Login</button>
        <div style={{color:"black", display:"flex", alignItems:"center",marginTop:"10px" }}>
          <p style={{marginRight:"5px"}}>Already have account ?</p>
          <Link to="/login" >Log in</Link>
        </div>
      </div>
    );
  }
  