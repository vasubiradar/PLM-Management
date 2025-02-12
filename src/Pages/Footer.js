import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";
import logo from "./logo.jpg"; // Add your college logo in assets folder

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-left">
        <img src={logo} alt="College Logo" className="footer-logo" />
        <div>
          <h3>College of computer science and information technology</h3>
          <p>NAAC Reaccredited Grade</p>
          <p>Ambajogai Road, Latur - 413 531</p>
          <p>Founded: 1982</p>
        </div>
      </div>

      <div className="footer-links">
        <Link to="/about" className="footer-item">About Us</Link>
        <Link to="/contact" className="footer-item">Contact</Link>
        <Link to="/privacy" className="footer-item">Privacy Policy</Link>
        <Link to="/terms" className="footer-item">Terms & Conditions</Link>
      </div>

      <div className="footer-right">
        <p>Follow us:</p>
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">🌐 Facebook</a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">🐦 Twitter</a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">📷 Instagram</a>
      </div>
    </footer>
  );
};

export default Footer;