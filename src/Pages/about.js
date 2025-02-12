import React from 'react';
import './about.css'; // Your updated CSS file

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
              src="https://media.istockphoto.com/id/177440807/photo/doctor-with-test-tube.jpg?s=612x612&w=0&k=20&c=B0ALtqCg0G_4E7D8Flvlo8pazkZuz087kCfl5l_mE7c=" 
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
              src="https://images.pexels.com/photos/7088474/pexels-photo-7088474.jpeg" 
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
              src="https://images.pexels.com/photos/7089017/pexels-photo-7089017.jpeg" 
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
              src="https://images.pexels.com/photos/7088471/pexels-photo-7088471.jpeg" 
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
              src="https://images.pexels.com/photos/7089045/pexels-photo-7089045.jpeg" 
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
              src="https://images.pexels.com/photos/7088480/pexels-photo-7088480.jpeg" 
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
