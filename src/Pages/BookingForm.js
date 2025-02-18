import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import BookingService from "./BookingService";
import "./BookingForm.css";

const BookingForm = () => {
    const { testId } = useParams();
    const navigate = useNavigate();
    const patientId = localStorage.getItem("userId");

    const testName = localStorage.getItem("selectedTestName"); // Get test name stored during test selection

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        contactNumber: "",
        age: "",
        gender: "",
        testDate: "",
        address: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const bookingData = { ...formData, patientId, testId, testName, status: "Pending" };

        try {
            await BookingService.createBooking(bookingData);
            alert("Your booking is successful! Status is 'Pending'. Confirmation soon.");
            navigate("/MyBookings");  // Redirect to MyBookings page after submission
        } catch (error) {
            console.error("Error creating booking:", error);
            alert("Failed to book the test. Please try again.");
        }
    };

    return (
        <div className="booking-container">
            <h2>Book Your Test</h2>
            <form onSubmit={handleSubmit} className="booking-form">
                <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
                <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
                <input type="text" name="contactNumber" placeholder="Contact Number" value={formData.contactNumber} onChange={handleChange} required />
                <input type="number" name="age" placeholder="Age" value={formData.age} onChange={handleChange} required />
                <select name="gender" value={formData.gender} onChange={handleChange} required>
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                </select>
                <input type="date" name="testDate" value={formData.testDate} onChange={handleChange} required />
                <textarea name="address" placeholder="Address" value={formData.address} onChange={handleChange} required />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default BookingForm;
