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
    axios.post(`${API_URL}/register-user`, userData),

  createAdmin: (adminData) =>
    axios.post(`${API_URL}/create-admin`, adminData),

  login: async function (username, password) {
    let response = await axios.post(`${API_URL}/login`, { username, password });
    
    const token = response.data.token;
    localStorage.setItem('username', username);
    localStorage.setItem('authToken', token);
    
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  
    let user = await this.getUserByUsername(username)
    
    localStorage.setItem('currentUser', JSON.stringify(user)[0]);
  },
  
  getCurrentUser: ()=> JSON.parse(localStorage.getItem('currentUser')),

  logout: () =>
    axios.post(`${API_URL}/logout`, {}),

    
  getAllUsers: () =>
    axios.get(`${API_URL}`),

  getUserByUsername: async function (username) {
    return await axios.get(`${API_URL}/username/${username}`,).then(response => response.data)
  },

  getUserByNIF: (nif) =>
    axios.get(`${API_URL}/by-nif/${nif}`),

  getUsersByDepartment: (departmentName) =>
    axios.get(`${API_URL}/by-department/${departmentName}`),

  updateUserByUsername: (username, updatedData) =>
    axios.put(`${API_URL}/username/${username}`, updatedData),

  inactivateUserByUsername: (username) =>
    axios.put(`${API_URL}/inactivate/${username}`, {}),

  updateBalanceByNIF: (nif, balanceData) =>
    axios.put(`${API_URL}/balance/${nif}`, balanceData),

  getBalanceByNIF: (nif) =>
    axios.get(`${API_URL}/balance/${nif}`),

  changePassword: (username, passwordData) =>
    axios.post(`${API_URL}/${username}/change-password`, passwordData),
};

export default UserService;


