import React from "react";
import "./HomePage.css";

const HomePage = () => {
  const heroImage = "https://islamabadspecialistsclinic.com/wp-content/uploads/2024/04/lab-image.webp";

  const stepIcons = [
    "https://cdn-icons-png.flaticon.com/512/747/747376.png",
    "https://cdn-icons-png.flaticon.com/512/2921/2921222.png",
    "https://cdn-icons-png.flaticon.com/512/190/190411.png",
    "https://cdn-icons-png.flaticon.com/512/724/724933.png",
  ];

  const steps = [
    "Register with your details",
    "Book your test online",
    "Visit or schedule home collection",
    "Download your test reports",
  ];

  return (
    <div className="homepage-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-text">
            <h1>Welcome to Our Pathology Lab</h1>
            <p>Accurate diagnostics, trusted results, and timely reports at your convenience.</p>
            <a href="/tests">
              <button className="nav-item login-btn">Book Your Test Now </button>
            </a>
          </div>
          <div className="hero-image-container">
            <img src={heroImage} alt="Hero" className="hero-image" />
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="steps-section">
        <h2 className="steps-title">How to Get Your Test Reports?</h2>
        <div className="steps-container">
          {steps.map((step, index) => (
            <div className="step-card" key={index}>
              <img src={stepIcons[index]} alt={`Step ${index + 1}`} className="step-icon" />
              <p className="step-text">{step}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
