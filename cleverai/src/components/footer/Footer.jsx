import React, { useState } from "react";
import { FaTwitter, FaFacebookF, FaLinkedinIn, FaYoutube } from "react-icons/fa";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div>
          <h3>Product</h3>
          <ul>
            <li>Features</li>
            <li>Pricing</li>
          </ul>
        </div>
        <div>
          <h3>Resources</h3>
          <ul>
            <li>Blog</li>
            <li>User Guides</li>
            
          </ul>
        </div>
        <div>
          <h3>Company</h3>
          <ul>
            <li>About Us</li>
            <li>Contact</li>
          </ul>
        </div>
      </div>
      <div className="social-icons">
        <FaTwitter className="icon" />
        <FaFacebookF className="icon" />
        <FaLinkedinIn className="icon" />
        <FaYoutube className="icon" />
      </div>
      <div className="footer-text">© 2025 NewsNexus. All Rights Reserved.</div>
    </footer>
  );
}
