import React from "react";
import "./FeaturesPage.css"
import Navbar from "../navbar/Navbar";
export default function FeaturPage(){
    return(
        <>
          <Navbar 
            linkText1="Home"
            linkText2="Features"
            linkText3="About Us"
            link1="/"
            link2="/features"
            link3="about-us"
            btn="Log In / Sign Up"
            btnNavLink="/login"
          /> 
       <div><h1>This page is available shortly</h1></div>
    </>);
}