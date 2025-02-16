import React, { useEffect, useState } from "react";
import TestService from "./TestService";
import BookingService from "./BookingService";
import  "./Sidebar.css";
import "./AdminDashboard.css";

const AdminDashboard = () => {
    const [tests, setTests] = useState([]);
    const [bookings, setBookings] = useState([]);
    const [view, setView] = useState("tests"); // "tests", "bookings", "addTest"
    const [newTest, setNewTest] = useState({ testName: "", imgUrl: "", description: "", price: "", duration: "" });

    useEffect(() => {
        loadTests();
    }, []);

    const handleDeleteTest = async (id) => {
      const confirmDelete = window.confirm("Are you sure you want to delete this test?");
      if (confirmDelete) {
          try {
              await TestService.deleteTest(id);
              setTests(tests.filter(test => test.id !== id));
          } catch (error) {
              console.error("Error deleting test", error);
          }
      }
  };

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

    return (
        <div className="admin-dashboard">
            <div className="sidebar">
            <h2>Admin Panel</h2>
            <button className="add-btn" onClick={() => setView("addTest")}>Add Test</button>
                <button className="view-tests-btn" onClick={() => setView("tests")}>View Tests</button>
                <button className="view-bookings-btn" onClick={() => { setView("bookings"); loadBookings(); }}>View Bookings</button>
        </div>
            {/* <Sidebar /> */}
            <div className="content">
                <h2>Admin Dashboard</h2>
                {/* <button className="add-btn" onClick={() => setView("addTest")}>Add Test</button>
                <button className="view-tests-btn" onClick={() => setView("tests")}>View Tests</button>
                <button className="view-bookings-btn" onClick={() => { setView("bookings"); loadBookings(); }}>View Bookings</button> */}
                
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
                                    <th>Test ID</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {bookings.map((booking) => (
                                    <tr key={booking.id}>
                                        <td>{booking.id}</td>
                                        <td>{booking.name}</td>
                                        <td>{booking.testId}</td>
                                        <td>{booking.status}</td>
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
        </div>
    );
};

export default AdminDashboard;
