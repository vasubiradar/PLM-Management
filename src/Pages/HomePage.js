import React from "react";
import "./HomePage.css";

const HomePage = () => {
  const heroImage = "https://t3.ftcdn.net/jpg/02/84/36/48/360_F_284364895_3uU4w7qfgaBtBD0ugtA1SVgXHQJ5kL8d.jpg";

  const stepIcons = [
    "https://cdn-icons-png.flaticon.com/512/747/747376.png", // Signup Icon
    "https://cdn-icons-png.flaticon.com/512/2921/2921222.png", // Form Icon
    "https://cdn-icons-png.flaticon.com/512/190/190411.png", // Approval Icon
    "https://cdn-icons-png.flaticon.com/512/724/724933.png", // Download Icon
  ];

  const steps = [
    "Sign up with your details",
    "Fill the ID Card Application Form",
    "Wait for Admin Approval",
    "Download Your ID Card",
  ];

  return (
    <div className="homepage-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-text">
            <h1>Welcome to Our ID Card Generator</h1>
            <p>Easily generate your student ID card in just a few steps!</p>
            <a href="/generate-id-card"><button className="nav-item login-btn">Click Here to Apply for an ID Card</button></a>
          </div>
          <div className="hero-image-container">
            <img src={heroImage} alt="Hero" className="hero-image" />
          </div>
        </div>
      </section>

      {/* Information Cards */}
      <section className="info-section">
        <div className="info-card">
          <h3>📄 Apply for an ID</h3>
          <p>Sign up and fill in the required details to request your student ID card.</p>
        </div>
        <div className="info-card">
          <h3>✅ Admin Approval</h3>
          <p>Once you submit the form, our admin team will review and approve your request.</p>
        </div>
        <div className="info-card">
          <h3>📥 Download ID</h3>
          <p>After approval, you can easily download your official student ID card.</p>
        </div>
      </section>

      {/* Steps Section */}
      <section className="steps-section">
        <h2 className="steps-title">How to Generate Your ID Card?</h2>
        <div className="steps-container">
          {steps.map((step, index) => (
            <div className="step-card" key={index}>
              <img src={stepIcons[index]} alt={Step `${index + 1}`} className="step-icon" />
              <p className="step-text">{step}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;