import axios from 'axios';

const API_URL = 'http://localhost:8080/api/tasks';

const TaskService = {
  getAllTasks: async function () {
    let response = await axios.get(`${API_URL}`)

    return response.data.map((task) => ({
      id: task._id,
      name: task.taskName || "Unnamed Task",
      completed: !!task.isCompleted,
    }))

  },
  getTaskById: (id) =>
    axios.get(`${API_URL}/${id}`).then(response=>response.data),

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
    getTasksDueNextWeek: () =>
      axios.get(`${API_URL}/due-next-week`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      }),
    
};

export default TaskService;
