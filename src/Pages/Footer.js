import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      {/* Left Section: Lab Info */}
      <div className="footer-left">
        <div>
          <h3>Trusted Pathology Lab</h3>
          <p>Accurate Diagnostics, Reliable Results</p>
          <p>123 Health Avenue, Wellness City - 456 789</p>
          <p>Serving since 1995</p>
        </div>
      </div>

      {/* Center Section: Navigation Links */}
      <div className="footer-links">
        <Link to="/about" className="footer-item">About Us</Link>
        <Link to="/services" className="footer-item">Our Services</Link>
        <Link to="/contact" className="footer-item">Contact Us</Link>
        <Link to="/privacy" className="footer-item">Privacy Policy</Link>
        <Link to="/terms" className="footer-item">Terms & Conditions</Link>
      </div>

      {/* Right Section: Social Links */}
      <div className="footer-right">
        <p>Follow us:</p>
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">🌐 Facebook</a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">🐦 Twitter</a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">📷 Instagram</a>
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">🔗 LinkedIn</a>
      </div>
    </footer>
  );
};

export default Footer;
