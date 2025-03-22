import React from "react";
import { Link } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
import "./css/Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">
        <img src="/public/logo3.0.png" alt="CleverAi Logo" className="logo-img" />
        <h3>CleverAi</h3>
      </div>
      <ul className="nav-links">
        <li><Link to="/" className="active">Home</Link></li>
        <li><Link to="/features">Features</Link></li>
        <li><ScrollLink to="about-us" smooth={true} duration={1000}>About Us</ScrollLink></li>
      </ul>
      <button className="signup-btn">Log In / Sign Up</button>
    </nav>
  );
};

export default Navbar;
