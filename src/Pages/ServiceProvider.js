import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BookingService from "./BookingService";
import "./ServiceProvider.css";

const ServiceProvider = () => {
    const { bookingId } = useParams(); // Get booking ID from URL params
    const [providerDetails, setProviderDetails] = useState({
        technicianName: "",
        technicianContact: "",
        technicianVisitDate: "",
        technicianVisitTime: ""
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setProviderDetails({ ...providerDetails, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await BookingService.updateTechnicianDetails(bookingId, providerDetails);
            alert("Service provider assigned successfully!");
            navigate("/admin-dashboard");
        } catch (error) {
            console.error("Error assigning provider", error);
        }
    };

    return (
        <div className="service-provider-form">
            <h2>Assign Service Provider</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="technicianName" placeholder="Technician Name" value={providerDetails.technicianName} onChange={handleChange} required />
                <input type="tel" name="technicianContact" placeholder="Technician Contact" value={providerDetails.technicianContact} onChange={handleChange} required />
                <input type="date" name="technicianVisitDate" placeholder="Visit Date" value={providerDetails.technicianVisitDate} onChange={handleChange} required />
                <input type="time" name="technicianVisitTime" placeholder="Visit Time" value={providerDetails.technicianVisitTime} onChange={handleChange} required />
                <div className="form-buttons">
                    <button type="button" className="cancel-btn" onClick={() => navigate("/admin-dashboard")}>Cancel</button>
                    <button type="submit" className="confirm-btn">Submit</button>
                </div>
            </form>
        </div>
    );
};

export default ServiceProvider;
