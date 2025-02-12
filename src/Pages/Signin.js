import React, { useState } from "react";
import UserService from "./UserService";
import { useNavigate } from "react-router-dom";
import "./Sign.css";  // Importing the CSS file

const Signin = ({ setIsAuthenticated, setIsUser, setIsAdmin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    UserService.getUsers()
      .then((response) => {
        const user = response.data.find(
          (user) => user.email === email && user.password === password
        );
        if (user) {
          // Set authentication state and local storage
          setIsAuthenticated(true);
          setIsUser(user.role === "user");
          setIsAdmin(user.role === "admin");
          
          localStorage.setItem("isAuthenticated", true);
          localStorage.setItem("isUser", user.role === "user");
          localStorage.setItem("isAdmin", user.role === "admin");
          localStorage.setItem("userId", user.id);  // Store user ID in local storage
          
          // Redirect to home page if user, or to admin page if admin
          if (user.role === "admin") {
            navigate("/admin");
            window.location.reload();
          } else {
            navigate("/");
            window.location.reload();
          }
        } else {
          alert("Invalid email or password!");
        }
      })
      .catch((error) => {
        console.error("There was an error logging in!", error);
      });
  };

  return (
    <div className="signin-form-container">
      <h2 className="signin-form-title">Sign In</h2>
      <form onSubmit={handleSubmit} className="signin-form">
        <div className="signin-input-field">
          <label className="signin-input-label">Email:</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="signin-input"
          />
        </div>
        <div className="signin-input-field">
          <label className="signin-input-label">Password:</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="signin-input"
          />
        </div>
        <button type="submit" className="signin-submit-btn">Sign In</button>
      </form>
      <p>Don't have an account? <a href="/signup">Signup</a></p>
    </div>
  );
};

export default Signin;