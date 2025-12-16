import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import Navbar from '../../components/navbar/Navbar'
import KeyBenefits from "../../components/home/KeyBenefits";
import Footer from "../../components/footer/Footer";


const Home = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="home-container">
        <Navbar />
        {/* Hero Section */}
        <div className="hero">
          <div className="hero-overlay"></div>
          <div className="hero-content">
            <h1>Transform Your Teaching Experience</h1>
            <p>AI-Powered Assistance at Your Fingertips</p>
            <button className="cta-btn" onClick={() => navigate("/signup")}>Get Started Now</button>
          </div>
        </div>

        {/* Adding Overview Component */}
        <div className="overview-section">
          <div className="Overview-Container">
            <KeyBenefits />
          </div>
        </div>
        <section className="contact-section">
          <h2 style={{ fontSize: "32px" }}>Contact Us</h2>
          <form className="contact-form">
            <input type="text" placeholder="Your Name" className="input-field" />
            <input type="email" placeholder="Your Email" className="input-field" />
            <textarea placeholder="Enter question or feedback" className="input-field"></textarea>
            <button className="submit-btn">Submit</button>
          </form>
        </section>
        <Footer />
      </div>
    </>
  );
};

export default Home;
