import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TestService from "./TestService";
import BookingService from "./BookingService";
import "./Sidebar.css";
import "./AdminDashboard.css";

const AdminDashboard = () => {
    const [tests, setTests] = useState([]);
    const [bookings, setBookings] = useState([]);
    const [view, setView] = useState("tests");
    const [newTest, setNewTest] = useState({ testName: "", imgUrl: "", description: "", price: "", duration: "" });
    const navigate = useNavigate();
    const [reportUrl, setReportUrl] = useState("");
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

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

    const loadBookings = async () => {
        try {
            const response = await BookingService.getAllBookings();
            setBookings(response.data);
        } catch (error) {
            console.error("Error fetching bookings", error);
        }
    };

    const handleDeleteTest = async (id) => {
        if (window.confirm("Are you sure you want to delete this test?")) {
            try {
                await TestService.deleteTest(id);
                setTests(tests.filter(test => test.id !== id));
            } catch (error) {
                console.error("Error deleting test", error);
            }
        }
    };

    const handleAddTest = async (e) => {
        e.preventDefault();
        try {
            const response = await TestService.addTest(newTest);
            setTests([...tests, response.data]);
            setView("tests");
            setNewTest({ testName: "", imgUrl: "", description: "", price: "", duration: "" });
        } catch (error) {
            console.error("Error adding test", error);
        }
    };

    const handleStatusChange = async (id, currentStatus) => {
        if (currentStatus === "Pending") {
            if (window.confirm("Are you sure you want to approve this booking?")) {
                try {
                    await BookingService.updateOnlyBookingStatus(id, "Approved");
                    setBookings(bookings.map(booking => 
                        booking.id === id ? { ...booking, status: "Approved" } : booking
                    ));
                } catch (error) {
                    console.error("Error updating booking status", error);
                }
            }
        }
    };

    const handleCompleteClick = (booking) => {
        console.log("Complete button clicked for booking:", booking); // Debugging
        setSelectedBooking(booking);
        setIsModalOpen(true);
    };
    
    const handleReportSubmit = async () => {
        if (!reportUrl.trim()) {
            alert("Please enter a valid report URL.");
            return;
        }
    
        try {
            await BookingService.updateBookingStatus(selectedBooking.id, "Completed", reportUrl);
            setBookings(bookings.map(booking =>
                booking.id === selectedBooking.id
                    ? { ...booking, status: "Completed", reportUrl }
                    : booking
            ));
            closeReportModal();
        } catch (error) {
            console.error("Error updating booking with report", error);
        }
    };
    
    const closeReportModal = () => {
        console.log("Closing modal..."); // Debugging
        setSelectedBooking(null);
        setIsModalOpen(false);
    };
    return (
        <div className="admin-dashboard">
            <div className="sidebar">
                <h2>Admin Panel</h2>
                <button className="add-btn" onClick={() => setView("addTest")}>Add Test</button>
                <button className="view-tests-btn" onClick={() => setView("tests")}>View Tests</button>
                <button className="view-bookings-btn" onClick={() => { setView("bookings"); loadBookings(); }}>View Bookings</button>
            </div>

            <div className="content">
                <h2>Admin Dashboard</h2>

                {view === "tests" && (
                    <>
                        <h3>Tests</h3>
                        <div className="test-cards">
                            {tests.map((test) => (
                                <div className="test-card" key={test.id}>
                                    <img src={test.imgUrl} alt={test.testName} className="test-img" />
                                    <h4>{test.testName}</h4>
                                    <p>{test.description}</p>
                                    <p><strong>Price:</strong> ${test.price}</p>
                                    <p><strong>Duration:</strong> {test.duration}</p>
                                    <button className="delete-btn" onClick={() => handleDeleteTest(test.id)}>Delete</button>
                                </div>
                            ))}
                        </div>
                    </>
                )}

                {view === "bookings" && (
                    <>
                        <h3>Booking Requests</h3>
                        <table className="custom-table">
                            <thead>
                                <tr>
                                    <th>Booking ID</th>
                                    <th>Patient Name</th>
                                    <th>Email</th>
                                    <th>Contact Number</th>
                                    <th>Age</th>
                                    <th>Gender</th>
                                    <th>Test Date</th>
                                    <th>Address</th>
                                    <th>Test ID</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {bookings.map((booking) => (
                                    <tr key={booking.id}>
                                        <td>{booking.id}</td>
                                        <td>{booking.name}</td>
                                        <td>{booking.email}</td>
                                        <td>{booking.contactNumber}</td>
                                        <td>{booking.age}</td>
                                        <td>{booking.gender}</td>
                                        <td>{booking.testDate}</td>
                                        <td>{booking.address}</td>
                                        <td>{booking.testId}</td>
                                        <td>{booking.status}</td>
                                        <td>
                                            {booking.status === "Pending" && (
                                                <button className="approve-btn" onClick={() => handleStatusChange(booking.id, booking.status)}>Approve</button>
                                            )}
                                            {booking.status === "Approved" && (
                                                <button className="complete-btn" onClick={() => handleCompleteClick(booking)}>Complete</button>
                                            )}
                                            {booking.status === "Completed" && <span>Completed</span>}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </>
                )}
            </div>

            {view === "addTest" && (
                <div className="add-test-container">
                    <h3>Add New Test</h3>
                    <form onSubmit={handleAddTest}>
                        <input type="text" placeholder="Test Name" value={newTest.testName} onChange={(e) => setNewTest({ ...newTest, testName: e.target.value })} required />
                        <input type="text" placeholder="Image URL" value={newTest.imgUrl} onChange={(e) => setNewTest({ ...newTest, imgUrl: e.target.value })} required />
                        <textarea placeholder="Description" value={newTest.description} onChange={(e) => setNewTest({ ...newTest, description: e.target.value })} required></textarea>
                        <input type="number" placeholder="Price" value={newTest.price} onChange={(e) => setNewTest({ ...newTest, price: e.target.value })} required />
                        <input type="text" placeholder="Duration" value={newTest.duration} onChange={(e) => setNewTest({ ...newTest, duration: e.target.value })} required />
                        <div className="modal-buttons">
                            <button className="cancel-btn" type="button" onClick={() => setView("tests")}>Cancel</button>
                            <button className="confirm-btn" type="submit">Add</button>
                        </div>
                    </form>
                </div>
            )}

            {isModalOpen && selectedBooking && (
                <div className="pop">
                    <div className="popup">
                        <h3>Upload Report for {selectedBooking.name}</h3>
                        <input type="text" placeholder="Report URL" value={reportUrl} onChange={(e) => setReportUrl(e.target.value)} required />
                        <div className="modal-buttons">
                            <button className="cancel-btn" onClick={closeReportModal}>Cancel</button>
                            <button className="confirm-btn" onClick={handleReportSubmit}>Submit</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;
