import React, { useEffect, useState } from "react";
import BookingService from "./BookingService";
// import "./MyBookings.css";

const MyBookings = () => {
    const [bookings, setBookings] = useState([]);
    const patientId = localStorage.getItem("userId"); // Fetch patient ID

    useEffect(() => {
        fetchBookings();
    }, []);

    const fetchBookings = async () => {
        try {
            const response = await BookingService.getBookingsByPatient(patientId);
            setBookings(response.data);
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
                            <p><strong>Date:</strong> {booking.testDate}</p>
                            <p><strong>Address:</strong> {booking.address}</p>
                            <p><strong>Status:</strong> <span className={`status-${booking.status.toLowerCase()}`}>{booking.status}</span></p>
                            {booking.status === "Confirmed" && booking.technician && (
                                <div className="technician-details">
                                    <p><strong>Technician Name:</strong> {booking.technician.name}</p>
                                    <p><strong>Contact:</strong> {booking.technician.contact}</p>
                                    <p><strong>Visit Time:</strong> {booking.technician.visitTime}</p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyBookings; // ✅ Ensure this export is present
