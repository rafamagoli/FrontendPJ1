<script>
import TaskService from "@/core/services/TaskService";
import UserService from "@/core/services/UserService";

export default {
  data() {
    return {
      tasks: [],
      users: {},
      currentUser: UserService.getCurrentUser(),
    };
  },
  computed: {
    activeTasks() {
      return this.tasks.filter((task) => !task.isCompleted);
    },
    completedTasks() {
      return this.tasks.filter((task) => task.isCompleted);
    },
  },
  methods: {
    async fetchTasks() {
      try {
        const userResponse = await UserService.getAllUsers();
        this.users = userResponse.data.reduce((acc, user) => {
          acc[user.username] = user.name || user.username;
          return acc;
        }, {});
        console.log("User mapping:", this.users);
  
        const tasks = await TaskService.getAllTasks();
        this.tasks = tasks.map((task) => ({
          id: task.id,
          taskName: task.taskName,
          assignedTo: this.users[task.assignedTo] || "Unknown",
          limitDate: task.limit_date.split("T")[0],
          isCompleted: task.isCompleted || false,
        }));
        console.log("Fetched tasks:", this.tasks);
      } catch (error) {
        console.error("Error fetching tasks:", error.response?.data || error.message);
      }
    },
    navigateToEditTask(taskId) {
      this.$router.push(`/task/edit/${taskId}`);
    },
    navigateToAddTask() {
      this.$router.push("/task/add");
    },
  },
  async mounted() {
    await this.fetchTasks();
  },
};
</script>

<template>
  <div id="tasks-page" class="page-background">
    <div class="main-content">
      <h1 id="page-title">Tasks</h1>

      <!-- Task Management Section -->
      <div class="tasks-container">
        <!-- Active Tasks Section -->
        <section class="tasks-section">
          <h2>Active Tasks</h2>
          <ul class="task-list">
            <li
              v-for="task in activeTasks"
              :key="task.id"
              class="task-item"
              @click="navigateToEditTask(task.id)"
            >
              <div class="task-title">{{ task.taskName }}</div>
              <div class="task-assigned">Assigned to: {{ task.assignedTo }}</div>
              <div class="task-date">Limit Date: {{ task.limitDate }}</div>
            </li>
          </ul>
        </section>

        <!-- Completed Tasks Section -->
        <section class="tasks-section">
          <h2>Completed Tasks</h2>
          <ul class="task-list">
            <li
              v-for="task in completedTasks"
              :key="task.id"
              class="task-item"
              @click="navigateToEditTask(task.id)"
            >
              <div class="task-title">{{ task.taskName }}</div>
              <div class="task-assigned">Assigned to: {{ task.assignedTo }}</div>
              <div class="task-date">Limit Date: {{ task.limitDate }}</div>
            </li>
          </ul>
        </section>
      </div>

      <!-- Add New Task Button -->
      <div v-if="!currentUser.isEmployee" class="create-task-container">
        <button @click="navigateToAddTask" class="create-task-btn">
          Create New Task
        </button>
      </div>
    </div>
  </div>
</template>


<style scoped>
#page-title {
  padding-top: 15px;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}

.main-content {
  margin-left: 250px; /* Push closer to the sidebar */
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.tasks-container {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.tasks-section {
  width: 40%; /* Occupy 40% of the remaining screen space for each column */
  margin-right: 10px; /* Add spacing between sections */
}

.task-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.task-item {
  margin-bottom: 15px;
  padding: 10px;
  background-color: #f9f9f9;
  border-radius: 5px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  color: #333;
  cursor: pointer;
  transition: background-color 0.3s;
}

.task-item:hover {
  background-color: #f5f5f5;
}

.task-title {
  font-weight: bold;
  margin-bottom: 5px;
}

.task-assigned,
.task-date {
  font-size: 0.9rem;
  color: #555;
}

.create-task-container {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.create-task-btn {
  width: 100%; /* Make the button span the entire available width */
  max-width: 800px; /* Optional: set a maximum width */
  padding: 12px; /* Increase padding for a larger button appearance */
  font-size: 1.1rem;
  border: none;
  cursor: pointer;
  border-radius: 10px;
  background: #000000;
  color: white;
}

.create-task-btn:hover {
  background: #333;
}
</style>
