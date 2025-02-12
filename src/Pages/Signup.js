import React, { useState } from "react";
import UserService from "./UserService.js";
import { useNavigate } from "react-router-dom";
import "./Sign.css";
const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("user");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const newUser = {
      email,
      password,
      role
    };

    UserService.addUser(newUser)
      .then(() => {
        alert("Signup successful!");
        navigate("/login"); // Redirect to login page after successful signup
      })
      .catch((error) => {
        console.error("There was an error signing up!", error);
      });
  };

  return (
    <div className="signup-form-container">
      <h2 className="signup-form-title">Sign Up</h2>
      <form onSubmit={handleSubmit} className="signup-form">
        <div className="signup-input-field">
          <label className="signup-input-label">Email:</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="signup-input"
          />
        </div>
        <div className="signup-input-field">
          <label className="signup-input-label">Password:</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="signup-input"
          />
        </div>
        <div className="signup-input-field">
          <label className="signup-input-label">Confirm Password:</label>
          <input
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="signup-input"
          />
        </div>
        {/* <div className="signup-input-field">
          <label className="signup-input-label">Role:</label>
          <select
            onChange={(e) => setRole(e.target.value)}
            value={role}
            className="signup-select"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div> */}
        <button type="submit" className="signup-submit-btn">Sign Up</button>
      </form>
      <p>Already have an account! <a href="/login">Login</a></p>
    </div>
  );
};

export default Signup;