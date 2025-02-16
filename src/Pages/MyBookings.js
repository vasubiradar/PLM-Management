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

                            {/* Technician details if status is Approved */}
                            {booking.status === "Approved" && (
                                <div className="technician-details">
                                    <h4>Technician Details:</h4>
                                    <p><strong>Name:</strong> {booking.technicianName || "N/A"}</p>
                                    <p><strong>Contact:</strong> {booking.technicianContact || "N/A"}</p>
                                    <p><strong>Visit Date:</strong> {booking.technicianVisitDate || "N/A"}</p>
                                    <p><strong>Visit Time:</strong> {booking.technicianVisitTime || "N/A"}</p>
                                </div>
                            )}

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
