import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
// import logo from "./logo.jpg"; // Ensure the logo is correctly placed in assets folder

const Navbar = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("isAuthenticated") === "true"
  );

  useEffect(() => {
    // Ensure authentication status is correctly set when component mounts
    setIsAuthenticated(localStorage.getItem("isAuthenticated") === "true");
  }, []);

  const handleLogout = () => {
    // Clear authentication data from localStorage
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("isUser");
    localStorage.removeItem("isAdmin");
    localStorage.removeItem("userId");

    // Update state and redirect
    setIsAuthenticated(false);
    navigate("/");

    // Refresh once after logout to update UI
    setTimeout(() => window.location.reload(), 100);
  };

  return (
    <nav className="navbar">
      {/* Left Side - Logo & College Name */}
      <div className="nav-logo">
        {/* <img src={logo} alt="College Logo" className="college-logo" /> */}
        <span className="college-name">TestingShashtra</span>
      </div>

      {/* Right Side - Navigation Links */}
      <div className="nav-links">
        <Link to="/" className="nav-item">Home</Link>
        <Link to="/generate-id-card" className="nav-item">All Tests</Link>
        <Link to="/about" className="nav-item">About Us</Link>
        <Link to="/contact" className="nav-item">Contact Us</Link>

        {isAuthenticated ? (
          <button onClick={handleLogout} className="nav-item login-btn">
            Logout
          </button>
        ) : (
          <Link to="/login" className="nav-item login-btn">Login</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;