import axios from 'axios';

const API_URL = 'http://localhost:8081/api/reservations';

const ReservationService = {
  createReservation: (reservationData) =>
    axios.post(`${API_URL}`, reservationData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        'Content-Type': 'application/json',
      },
    }),

  getAllReservations: () =>
    axios.get(`${API_URL}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('authToken')}`,
      },
    }),

  getReservationById: (id) =>
    axios.get(`${API_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('authToken')}`,
      },
    }),

  getReservationsByNif: (nif) =>
    axios.get(`${API_URL}/nif/${nif}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('authToken')}`,
      },
    }),

  updateReservation: (id, updatedData) =>
    axios.put(`${API_URL}/${id}`, updatedData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        'Content-Type': 'application/json',
      },
    }),

  deleteReservation: (id) =>
    axios.delete(`${API_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('authToken')}`,
      },
    }),
};

export default ReservationService;
