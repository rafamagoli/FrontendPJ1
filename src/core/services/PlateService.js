import axios from 'axios';

const API_URL = 'http://localhost:8081/api/plates';

const PlateService = {
  getAllPlates: () =>
    axios.get(`${API_URL}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('authToken')}`,
      },
    }),

  getPlateByName: (name) =>
    axios.get(`${API_URL}/${name}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('authToken')}`,
      },
    }),

  createPlate: (plateData) =>
    axios.post(`${API_URL}`, plateData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        'Content-Type': 'application/json',
      },
    }),

  updatePlate: (name, updatedData) =>
    axios.put(`${API_URL}/${name}`, updatedData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        'Content-Type': 'application/json',
      },
    }),

  deletePlate: (name) =>
    axios.delete(`${API_URL}/${name}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('authToken')}`,
      },
    }),
};

export default PlateService;
