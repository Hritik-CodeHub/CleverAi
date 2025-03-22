import React from "react";
import  "./css/Home.css";;  // Import CSS file
import Navbar from '../navbar/Navbar';
import Overview from "./Overview";
import Footer from "../footer/Footer";
import AboutUs from "./AboutUs";
import ContactUs from "./ContactUs";

const Home = () => {
  return (
    <>
      <div className="home-container">
        <Navbar 
          linkText1="Home"
          linkText2="Features"
          linkText3="About Us"
          link1="/"
          link2="/features"
          link3="about-us"
          btn="Log In / Sign Up"
        /> 

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
