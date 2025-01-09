import axios from 'axios';

const API_URL = 'http://localhost:8080/api/departments';

const DepartmentService = {
  getAllDepartments: () =>
    axios.get(`${API_URL}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('authToken')}`,
      },
    }),
  getDepartmentByName: (name) =>
    axios.get(`${API_URL}/by-department/${departmentName}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('authToken')}`,
      },
    }),
  createDepartment: (departmentData) =>
    axios.post(`${API_URL}`, departmentData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('authToken')}`,
      },
    }),
  updateDepartment: (name, updatedData) =>
    axios.put(`${API_URL}/${name}`, updatedData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('authToken')}`,
      },
    }),
  deleteDepartment: (name) =>
    axios.delete(`${API_URL}/${name}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('authToken')}`,
      },
    }),
  getCanteenDiscount: (nif) =>
    axios.get(`${API_URL}/canteendiscount/${nif}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('authToken')}`,
      },
    }),
};

export default DepartmentService;
