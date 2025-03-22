import React from "react";
import "./css/About.css";

export default function ContactUs() {
  return (
    <section className="contact-section">
      <h2 style={{fontSize:"32px"}}>Contact Us</h2>
      <form className="contact-form">
        <input type="text" placeholder="Your Name" className="input-field" />
        <input type="email" placeholder="Your Email" className="input-field" />
        <textarea placeholder="Enter question or feedback" className="input-field"></textarea>
        <button className="submit-btn">Submit</button>
      </form>
    </section>
  );
}
