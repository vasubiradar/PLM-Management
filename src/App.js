import React, { useState, useEffect } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Signin from "./Pages/Signin.js";
import Signup from "./Pages/Signup.js";
import HomePage from "./Pages/HomePage.js";
import Navbar from "./Pages/Navbar";
import Footer from "./Pages/Footer";
import Contact from "./Pages/contact.js";
import About from "./Pages/about.js";
import AdminPage from "./Pages/AdminPage.js";
import UserTestPage from "./Pages/UserTestPage.js";
import BookingForm from "./Pages/BookingForm.js";
import MyBookings from "./Pages/MyBookings.js";
import ServiceProvider from "./Pages/ServiceProvider.js";

import './App.css';

import { getFromLocalStorage, setToLocalStorage } from "./Services/LocalStorageUtil.js";

function App() {
  const initialAuthStatus = getFromLocalStorage("isAuthenticated") || false;
  const initialIsUser = getFromLocalStorage("isUser") || false;
  const initialIsAdmin = getFromLocalStorage("isAdmin") || false;

  const [isAuthenticated, setIsAuthenticated] = useState(initialAuthStatus);
  const [isUser, setIsUser] = useState(initialIsUser);
  const [isAdmin, setIsAdmin] = useState(initialIsAdmin);

  const handleLogout = () => {
    setIsAuthenticated(false);
    setIsUser(false);
    setIsAdmin(false);
    setToLocalStorage("isAuthenticated", false);
    setToLocalStorage("isUser", false);
    setToLocalStorage("isAdmin", false);
    window.location.reload();
  };

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
      
      <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/tests" element={<UserTestPage />} />
        <Route path="/book/:testId" element={<BookingForm />} />
        <Route path="/MyBookings" element={<MyBookings/>} />
        <Route path="/serviceprovider" element={<ServiceProvider />} />

        <Route
          path="/login"
          element={<Signin setIsAuthenticated={setIsAuthenticated} setIsUser={setIsUser} setIsAdmin={setIsAdmin} />}
        />
        <Route
            path="/admin"
            element={isAuthenticated && isAdmin ? <AdminPage /> : <Signin setIsAuthenticated={setIsAuthenticated} setIsUser={setIsUser} setIsAdmin={setIsAdmin} />}
          />
          
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;