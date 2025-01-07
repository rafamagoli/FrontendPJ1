import axios from 'axios';

const API_URL = 'http://localhost:8080/api/tasks';

const TaskService = {
  getAllTasks: () =>
    axios.get(`${API_URL}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('authToken')}`,
      },
    }),

  getTaskById: (id) =>
    axios.get(`${API_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('authToken')}`,
      },
    }),

  getTasksByUsername: (username) =>
    axios.get(`${API_URL}/user/${username}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('authToken')}`,
      },
    }),

  createTask: (taskData) =>
    axios.post(`${API_URL}`, taskData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        'Content-Type': 'application/json',
      },
    }),

  updateTask: (id, updatedData) =>
    axios.put(`${API_URL}/${id}`, updatedData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        'Content-Type': 'application/json',
      },
    }),
};

export default TaskService;
