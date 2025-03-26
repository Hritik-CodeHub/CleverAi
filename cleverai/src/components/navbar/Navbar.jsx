import React from "react";
import { Link , useNavigate} from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
import "./Navbar.css";

const Navbar = ({linkText1,linkText2,linkText3,link1,link2,link3,btn,btnNavLink}) => {
  const navigate = useNavigate(); // React Router's navigation hook
  return (
    <nav className="navbar">
      <div className="logo">
        <img src="/public/logo3.0.png" alt="CleverAi Logo" className="logo-img" />
        <h3>CleverAi</h3>
      </div>
      <ul className="nav-links">
        <li><Link to={link1} className="active">{linkText1}</Link></li>
        <li><Link to={link2}>{linkText2}</Link></li>
        <li><ScrollLink to={link3} smooth={true} duration={1000}>{linkText3}</ScrollLink></li>
      </ul>
      <button className="signup-btn" onClick={() => navigate(btnNavLink)}>{btn}</button>
    </nav>
  );
};

export default Navbar;