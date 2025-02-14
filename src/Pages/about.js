import React from 'react';
import './about.css';

const About = () => {
  return (
    <div className="about-container">
      {/* Header Section */}
      <header className="about-header">
        <div className="header-overlay">
          <h1>About Our Pathology Lab</h1>
          <p>Precision. Care. Accuracy. Your trusted diagnostic partner!</p>
        </div>
      </header>

      {/* Jumbotron Section */}
      <section className="jumbotron">
        <h2>Our Diagnostic Services</h2>
        <div className="service-container">
          {/* Blood Test */}
          <div className="service-card">
            <img 
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGyVu5o4TTotrr-_GwbuemsEI3LhRlOeRqNg&s" 
              alt="Blood Test" 
              className="service-image" 
            />
            <div className="service-info">
              <h3>Blood Test</h3>
              <p>Accurate blood analysis for better health assessment.</p>
            </div>
          </div>

          {/* X-Ray */}
          <div className="service-card">
            <img 
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgvEe9iCpo-7cS-aqwrEYsbuOXPTUMfCMvfw&s" 
              alt="X-Ray" 
              className="service-image" 
            />
            <div className="service-info">
              <h3>X-Ray</h3>
              <p>High-resolution imaging for precise diagnosis.</p>
            </div>
          </div>

          {/* Urine Test */}
          <div className="service-card">
            <img 
              src="https://www.metropolisindia.com/upgrade/blog/upload/2022/12/The-Urine-Routine-Test-How-It-Works-Preparation-Tips-_-Results.jpg" 
              alt="Urine Test" 
              className="service-image" 
            />
            <div className="service-info">
              <h3>Urine Test</h3>
              <p>Quick and efficient urine analysis for various conditions.</p>
            </div>
          </div>

          {/* ECG */}
          <div className="service-card">
            <img 
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-ERApGp6pYHyWfFDDo3EJZRoH17VJv5qcHw&s" 
              alt="ECG" 
              className="service-image" 
            />
            <div className="service-info">
              <h3>ECG</h3>
              <p>Advanced heart monitoring for accurate cardiac assessment.</p>
            </div>
          </div>

          {/* MRI Scan */}
          <div className="service-card">
            <img 
              src="https://cdn-prod.medicalnewstoday.com/content/images/articles/146/146309/mri-scan.jpg" 
              alt="MRI Scan" 
              className="service-image" 
            />
            <div className="service-info">
              <h3>MRI Scan</h3>
              <p>Detailed imaging for deep tissue and organ examination.</p>
            </div>
          </div>

          {/* COVID-19 Test */}
          <div className="service-card">
            <img 
              src="https://sunrisediagnosis.com/wp-content/uploads/2021/02/covid-test.jpg" 
              alt="COVID-19 Test" 
              className="service-image" 
            />
            <div className="service-info">
              <h3>COVID-19 Test</h3>
              <p>Fast and reliable testing for COVID-19 detection.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="about-footer">
        <p>Contact Us: info@pathologylab.com | Phone: +91 98765 43210</p>
      </footer>
    </div>
  );
};

export default About;
