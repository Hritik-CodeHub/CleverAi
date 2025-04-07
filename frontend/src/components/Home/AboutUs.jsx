import React from "react";
import "./homecss/About.css";

const teamMembers = [
  { name: "Prateek Maurya", role: "MERN Stack Developer", img: "/prateekImg.png" },
  { name: "Hritik Verma", role: "MERN Stack Developer", img: "/hritikImg.jpg" },
  { name: "Aman Ali", role: "Frontend Developer", img: "/amanImg.jpg" },
];

export default function AboutUs() {
  return (
    <section className="about-section" id="about-us">
      <h1 style={{fontSize:"36px" }}>About Us</h1>
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
