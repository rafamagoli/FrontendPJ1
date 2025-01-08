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

    // TODO: remove try catch once API is fixed
    try {
      let user = await this.getUserByUsername(username);
      // Mantém compatibilidade com user como array ou objeto
      localStorage.setItem('currentUser', JSON.stringify(user[0] || user || {}));
    } catch (error) {
      localStorage.setItem('currentUser', JSON.stringify({}));
    }
  },
  
  getCurrentUser: function(){
    let currentUserData = localStorage.getItem('currentUser');
    let currentUser = JSON.parse(currentUserData || "{}");

    currentUser.isAdmin = currentUser.role === 'Admin';
    currentUser.isCanteenManager = currentUser.role === 'Manager' && currentUser.department === 'canteen';
    currentUser.isHRManager = currentUser.role === 'Manager' && currentUser.department === 'Human Resources';
    currentUser.isITManager = currentUser.role === 'Manager' && currentUser.department === 'Information Technology';
    currentUser.isFinManager = currentUser.role === 'Manager' && currentUser.department === 'Finance';
    currentUser.isManager = currentUser.role === 'Manager';
    currentUser.isEmployee = currentUser.role === 'Employee';

    return currentUser;
  },

  logout: function() {
    axios.post(`${API_URL}/logout`, {})
    localStorage.clear()
  },
  getAllUsers: () =>
    axios.get(`${API_URL}`),

  getUserByUsername: async function (username) {
    return await axios.get(`${API_URL}/username/${username}`,).then(response => response.data);
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