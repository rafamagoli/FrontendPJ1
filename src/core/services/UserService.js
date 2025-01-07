import axios from 'axios';

const API_URL = 'http://localhost:8080/api/users';

const UserService = {
  setAuthToken(token) {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common["Authorization"];
    }
  },

  createUser: (userData) =>
    axios.post(`${API_URL}/register-user`, userData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    }),

  createAdmin: (adminData) =>
    axios.post(`${API_URL}/create-admin`, adminData),

  login: (username, password) =>
    axios.post(`${API_URL}/login`, { username, password }),

  logout: () =>
    axios.post(`${API_URL}/logout`, {}, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    }),

  getAllUsers: () =>
    axios.get(`${API_URL}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    }),

  getUserByUsername: (username) =>
    axios.get(`${API_URL}/username/${username}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    }),

  getUserByNIF: (nif) =>
    axios.get(`${API_URL}/by-nif/${nif}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    }),

  getUsersByDepartment: (departmentName) =>
    axios.get(`${API_URL}/by-department/${departmentName}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    }),

  updateUserByUsername: (username, updatedData) =>
    axios.put(`${API_URL}/username/${username}`, updatedData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    }),

  inactivateUserByUsername: (username) =>
    axios.put(`${API_URL}/inactivate/${username}`, {}, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    }),

  updateBalanceByNIF: (nif, balanceData) =>
    axios.put(`${API_URL}/balance/${nif}`, balanceData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    }),

  getBalanceByNIF: (nif) =>
    axios.get(`${API_URL}/balance/${nif}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    }),

  changePassword: (username, passwordData) =>
    axios.post(`${API_URL}/${username}/change-password`, passwordData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    }),
};

export default UserService;
