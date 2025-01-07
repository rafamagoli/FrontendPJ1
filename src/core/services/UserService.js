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
  getUserById: (id) =>
    axios.get(`${API_URL}/by-id/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    }),
  createUser: (userData) =>
    axios.post(`${API_URL}/register-user`, userData, {
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
  login: (username, password) =>
    axios.post(`${API_URL}/login`, { username, password }),
  logout: () =>
    axios.post(`${API_URL}/logout`, {}, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    }),
};

export default UserService;
