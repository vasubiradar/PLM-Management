import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TestService from "./TestService";
import "./UserTestPage.css";

const UserTestPage = () => {
    const [tests, setTests] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        loadTests();
    }, []);

    const loadTests = async () => {
        try {
            const response = await TestService.getTests();
            setTests(response.data);
        } catch (error) {
            console.error("Error fetching tests", error);
        }
    };

    return (
        <div className="user-test-container">
            <h2 className="test-header">Available Tests</h2>
            <div className="test-grid">
                {tests.map((test) => (
                    <div className="test-card" key={test.id}>
                        <img src={test.imgUrl} alt={test.testName} className="test-image" />
                        <div className="test-info">
                            <h4 className="test-title">{test.testName}</h4>
                            <p className="test-description">{test.description}</p>
                            <p className="test-price"><strong>Price:</strong> ${test.price}</p>
                            <p className="test-duration"><strong>Duration:</strong> {test.duration}</p>
                            <button className="book-now-btn" onClick={() => navigate(`/book/${test.id}`)}>Book Now</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UserTestPage;
