import React from "react";
import "./css/About.css";

const teamMembers = [
  { name: "Prateek Maurya", role: "Software Engineer", img: "./src/assets/prateekImg.png" },
  { name: "Hritik Verma", role: "Software Engineer", img: "./src/assets/hritikImg.jpg" },
  { name: "Aman Ali", role: "Software Engineer", img: "./src/assets/amanImg.jpg" },
  { name: "Prem Vishwakarma", role: "Software Engineer", img: "./src/assets/premImg.jpg" },
];

export default function AboutUs() {
  return (
    <section className="about-section" id="about-us">
      <h1 style={{fontSize:"36px"}}>About Us</h1>
      <h2 style={{marginTop:"20px",fontSize:"32px"}}>Meet the Team</h2>
      <div className="team-container">
        {teamMembers.map((member, index) => (
          <div key={index} className="team-member">
            <img src={member.img} alt={member.name} className="team-img" />
            <h3>{member.name}</h3>
            <p>{member.role}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
