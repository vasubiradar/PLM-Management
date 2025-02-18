import React, { useEffect, useState } from "react";
import BookingService from "./BookingService";
import axios from "axios";
import "./MyBookings.css";

const MyBookings = () => {
    const [bookings, setBookings] = useState([]);
    const [testNames, setTestNames] = useState({});
    const patientId = localStorage.getItem("userId");

    useEffect(() => {
        fetchBookings();
    }, []);

    const getBookingMessage = (status) => {
        switch (status) {
            case "Pending":
                return "Thank you for your booking! Our technician will contact you shortly to confirm your appointment.";
            case "Approved":
                return "Your booking has been approved!  We'll see you soon."; // Or a message with technician details if available
            case "Completed":
                return "Your test is complete. Please see your results below."; // Or a message with a link to the report
            default:
                return "Booking status: " + status; // Default message
        }
    };

    const fetchBookings = async () => {
        try {
            const response = await BookingService.getBookingsByPatient(patientId);
            const bookingsData = response.data;

            // Fetch test names for each booking
            const testNamesMap = {};
            await Promise.all(
                bookingsData.map(async (booking) => {
                    try {
                        const testResponse = await axios.get(`http://localhost:8900/api/tests/${booking.testId}`);
                        testNamesMap[booking.testId] = testResponse.data.testName;
                    } catch (error) {
                        console.error(`Error fetching test name for testId ${booking.testId}`, error);
                        testNamesMap[booking.testId] = "Unknown Test"; // Fallback
                    }
                })
            );

            setTestNames(testNamesMap);
            setBookings(bookingsData);
        } catch (error) {
            console.error("Error fetching bookings", error);
        }
    };

    return (
        <div className="my-bookings-container">
            <h2 className="my-bookings-header">My Bookings</h2>
            {bookings.length === 0 ? (
                <p className="no-bookings">No bookings found.</p>
            ) : (
                <div className="bookings-list">
                    {bookings.map((booking) => (
                        <div className="booking-card" key={booking.id}>

                            <h3>{booking.testName}</h3>
                            
                            
                            <h3>Test: {testNames[booking.testId] || "Loading..."}</h3>
                            <p><strong>Name:</strong> {booking.name}</p>
                            <p><strong>Contact:</strong> {booking.contactNumber}</p>
                            <p><strong>Email:</strong> {booking.email}</p>
                            <p><strong>Age:</strong> {booking.age}</p>
                            <p><strong>Gender:</strong> {booking.gender}</p>
                            <p><strong>Address:</strong> {booking.address}</p>
                            <p><strong>Test Date:</strong> {booking.testDate}</p>
                            <p><strong>Status:</strong> 
                                <span className={`status-${booking.status.toLowerCase()}`}>
                                    {booking.status}
                                </span>
                            </p>
                            <p className="booking-message"><strong>{getBookingMessage(booking.status)}</strong></p>

                            {/* Technician details if status is Approved */}
                           

                            {/* Report URL if status is Completed */}
                            {booking.status === "Completed" && booking.reportUrl && (
                                <div className="report-section">
                                    <h4>Test Report:</h4>
                                    <a href={booking.reportUrl} target="_blank" rel="noopener noreferrer">
                                        Click here to view report
                                    </a>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyBookings;
