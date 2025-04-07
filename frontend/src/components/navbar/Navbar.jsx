import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHome, setIsHome] = useState(false);

  useEffect(() => {
    setIsHome(location.pathname === "/");
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <img src="/logo3.0.png" alt="CleverAi Logo" className="logo-img" />
        <h3>CleverAi</h3>
      </div>

      {isHome ? (
        <>
          <div className={`nav-links ${isMenuOpen ? "active" : ""}`}>
            <ul>
              <li><Link to="/" className="active">Home</Link></li>
              <li><ScrollLink to="about-us" smooth={true} duration={1000}>About Us</ScrollLink></li>
            </ul>
            <button className="signup-btn mobile" onClick={() => navigate("/login")}>
              Sign Up / Login
            </button>
          </div>
          <button className="signup-btn desktop" onClick={() => navigate("/login")}>
            Sign Up / Login
          </button>
        </>
      ) : location.pathname === "/signup" || location.pathname === "/login" ? (
        <button className="logout-btn" onClick={() => navigate("/")}>
          Back
        </button>
      ) : (
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      )}

      {isHome && (
        <div className="hamburger" onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
