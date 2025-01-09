import axios from "axios";

const API_URL = "http://localhost:8080/api/tasks";

const TaskService = {
  getAllTasks: async function () {
    try {
      const response = await axios.get(`${API_URL}`);
      console.log("API Response:", response.data); // Log response data
      return response.data.map((task) => ({
        id: task._id,
        taskName: task.taskName || "Unnamed Task",
        assignedTo: task.assignedTo || "Unassigned",
        limit_date: task.limit_date || "No Date",
        isCompleted: task.isCompleted || false,
      }));
    } catch (error) {
      console.error("Error fetching tasks:", error.response?.data || error.message);
      throw error; // Re-throw the error to be handled in the calling function
    }
  },

  getTaskById: (id) =>
    axios.get(`${API_URL}/${id}`).then((response) => response.data),

  getTasksByUsername: (username) =>
    axios.get(`${API_URL}/user/${username}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    }),

  createTask: (taskData) =>
    axios.post(`${API_URL}`, taskData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        "Content-Type": "application/json",
      },
    }),

  updateTask: (id, updatedData) =>
    axios.put(`${API_URL}/${id}`, updatedData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        "Content-Type": "application/json",
      },
    }),

  getTasksDueNextWeek: () =>
    axios.get(`${API_URL}/due-next-week`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    }),
};

export default TaskService;
