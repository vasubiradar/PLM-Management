import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BookingService from "./BookingService";
import "./ServiceProvider.css";

const ServiceProvider = () => {
    const [providerDetails, setProviderDetails] = useState({
        name: "",
        experience: "",
        contactNumber: "",
        date: "",
        time: ""
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setProviderDetails({ ...providerDetails, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await BookingService.assignProvider(providerDetails);
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
                <input type="text" name="name" placeholder="Provider Name" value={providerDetails.name} onChange={handleChange} required />
                <input type="text" name="experience" placeholder="Experience (years)" value={providerDetails.experience} onChange={handleChange} required />
                <input type="tel" name="contactNumber" placeholder="Contact Number" value={providerDetails.contactNumber} onChange={handleChange} required />
                <input type="date" name="date" placeholder="Date" value={providerDetails.date} onChange={handleChange} required />
                <input type="time" name="time" placeholder="Time" value={providerDetails.time} onChange={handleChange} required />
                <div className="form-buttons">
                    <button type="button" className="cancel-btn" onClick={() => navigate("/admin-dashboard")}>Cancel</button>
                    <button type="submit" className="confirm-btn">Submit</button>
                </div>
            </form>
        </div>
    );
};

export default ServiceProvider;
