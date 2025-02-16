import axios from "axios";

const BOOKING_REST_API_URL = "http://localhost:8900/api/bookings";

class BookingService {
  // Get all bookings
  getAllBookings() {
    return axios.get(BOOKING_REST_API_URL);
  }

  // Get bookings by patient ID
  getBookingsByPatient(patientId) {
    return axios.get(`${BOOKING_REST_API_URL}/patient/${patientId}`);
  }

  // Create a new booking
  createBooking(booking) {
    return axios.post(BOOKING_REST_API_URL, booking);
  }

  // Update technician details
  updateTechnicianDetails(id, technicianDetails) {
    return axios.put(`${BOOKING_REST_API_URL}/${id}/technician`, null, {
      params: {
        technicianName: technicianDetails.name,
        technicianContact: technicianDetails.contact,
        visitDate: technicianDetails.visitDate,
        visitTime: technicianDetails.visitTime,
      },
    });
  }

  // Update booking status and report URL
  updateBookingStatus(id, status, reportUrl = null) {
    return axios.put(`${BOOKING_REST_API_URL}/${id}/status`, null, {
      params: {
        status: status,
        reportUrl: reportUrl,
      },
    });
  }
}

export default new BookingService();
