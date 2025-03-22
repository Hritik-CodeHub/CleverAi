import React from "react";
import Navbar from "../Navbar"; // Import the Navbar component
import  "./css/Home.css";;  // Import CSS file
import Overview from "./Overview";
import Footer from "../Footer";
import AboutUs from "./AboutUs";
import ContactUs from "./ContactUs";

const Home = () => {
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
            <button className="cta-btn">Get Started Now</button>
          </div>
        </div>

          {/* Adding Overview Component */}
          <div className="overview-section">
          <Overview />
          </div>
          <AboutUs/>
          <ContactUs/>
          <Footer/>
      </div>
    </>
  );
};

export default Home;
