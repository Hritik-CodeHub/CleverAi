import React from "react";
import { FaRobot, FaChartLine, FaUserGraduate, FaCode, FaLightbulb, FaStar } from "react-icons/fa";

const BenefitCard = ({ icon: Icon, title, description }) => {
  let styles={ 
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "30px",
    textAlign: "center",
    boxShadow: "2px 2px 10px rgba(0,0,0,0.1)",
    width: "100%",
    maxWidth: "400px",
    margin: "0 auto" };

    return (
        <div style={styles}>
          <Icon style={{ fontSize: "50px", color: "#007bff", marginBottom: "15px" }} />
          <h3 style={{ fontSize: "24px", fontWeight: "bold" }}>{title}</h3>
          <p style={{ color: "#555", fontSize: "16px" }}>{description}</p>
        </div>
      );
    };

export default function AIAssistantBenefits() {
  let WorksSec={ 
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    maxWidth: "80%",
    margin: "0 auto",
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "30px",
    boxShadow: "2px 2px 10px rgba(0,0,0,0.1)" }
   let whychooseus={ 
    maxWidth: "80%", 
    margin: "40px auto", 
    textAlign: "center", 
    border: "1px solid #ddd", 
    borderRadius: "8px", 
    padding: "30px", 
    boxShadow: "2px 2px 10px rgba(0,0,0,0.1)"
  }
  const benefits = [
    { icon: FaRobot, title: "Automated Grading", description: "Our AI instantly evaluates objective, subjective, and even handwritten assignments." },
    { icon: FaUserGraduate, title: "Personalized Feedback", description: "Get AI-driven insights tailored to each student's performance and needs." },
    { icon: FaChartLine, title: "Educator Dashboard", description: "Track student progress, analyze performance trends, and optimize teaching strategies." },
    { icon: FaCode, title: "AI-Powered Code Evaluation", description: "Automatically assess programming assignments, check efficiency, and suggest improvements." },
    { icon: FaLightbulb, title: "Smart Recommendations", description: "Students receive learning material suggestions based on their strengths and weaknesses." },
    { icon: FaStar, title: "AI-Powered Assistance", description: "Integrates Google's Gemini API for instant feedback, personalized recommendations, and enhanced user interactions." }
  ];

  const howItWorks = {
    title: "How It Works?",
    description: "Seamless AI Integration for Smarter Learning",
    steps: [
      "Upload or submit assignments (text, handwritten, or code).",
      "AI evaluates and generates a detailed report.",
      "Personalized feedback and performance insights are shared with students.",
      "Educators can review, adjust, and approve final grades."
    ]
  };

  const whyChooseUs = {
    title: "Why Choose Us?",
    description: "Empowering Educators, Enhancing Learning",
    points: [
      "50% Less Time Spent on Grading - Focus on teaching while AI handles assessments.",
      "Adaptive Learning Paths - Personalized recommendations to help students improve.",
      "Smart Automation - Save time without compromising feedback quality.",
      "Aligned with UN SDG 4 - Supporting quality education for all."
    ]
  };

  return (
    <div style={{ backgroundColor: "#f8f9fa", padding: "40px 20px" }}>
      <div style={{ maxWidth: "80%", margin: "0 auto", textAlign: "center" }}>
        <h2 >Revolutionizing Education with AI</h2>
        <p style={{ color: "#666", marginTop: "10px" }}>
          Grading assignments and providing feedback can be overwhelming for educators, taking up valuable time that could be spent on teaching. Our AI-Powered Teacher Assistant automates grading, delivers personalized feedback, and provides deep insights into student performance—allowing teachers to focus on what truly matters: teaching and mentoring.
        </p>
      </div>
      <h2 style={{ marginTop:"40px"}}>Key Benefits</h2>
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "30px", maxWidth: "80%", margin: "40px auto" }}>
        {benefits.map((benefit, index) => (
          <BenefitCard key={index} icon={benefit.icon} title={benefit.title} description={benefit.description} />
        ))}
      </div>
      
      {/* How It Works Section */}
      <div style={WorksSec}>
        <div style={{ flex: 1 }}>
          <h2>{howItWorks.title}</h2>
          <p style={{ color: "#666", marginTop: "10px" }}>{howItWorks.description}</p>
          <ul style={{ marginTop: "20px", fontSize: "18px", color: "#555" }}>
            {howItWorks.steps.map((step, index) => (
              <li key={index} style={{ marginBottom: "10px" }}>{step}</li>
            ))}
          </ul>
        </div>
        <div style={{ flex: 1}}>
          <img src="/aiImg.webp" alt="How it works" style={{ maxWidth: "100%", borderRadius: "8px" }} />
        </div>
      </div>
      
      {/* Why Choose Us Section */}
      <div style={whychooseus}>
        <h2>{whyChooseUs.title}</h2>
        <p style={{ color: "#666", marginTop: "10px" }}>{whyChooseUs.description}</p>
        <ul style={{ marginTop: "20px", fontSize: "18px", color: "#555", listStyleType: "none", padding: 0 }}>
          {whyChooseUs.points.map((point, index) => (
            <li key={index} style={{ marginBottom: "10px" }}>✔ {point}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
