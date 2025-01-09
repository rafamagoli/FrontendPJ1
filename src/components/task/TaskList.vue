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
          <div class="task-list">
            <ul>
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
          </div>
        </section>

        <!-- Completed Tasks Section -->
        <section class="tasks-section">
          <h2>Completed Tasks</h2>
          <div class="task-list">
            <ul>
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
          </div>
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

<style>
.tasks-container {
  display: grid; /* Use grid layout para alinhamento flexível */
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); /* Alinha colunas responsivamente */
  gap: 20px; /* Espaço entre as seções */
  width: 100%;
  margin-top: 20px;
}

.tasks-section {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.tasks-section h2 {
  margin-bottom: 10px;
  font-size: 1.2rem;
  font-weight: bold;
  text-align: center;
}

.task-list {
  max-height: 300px;
  overflow-y: auto;
  border: 1px solid #ddd;
  padding: 10px;
  list-style: disc inside;
  padding: 10px 20px;
  background: #fff;
  list-style: none;
  margin: 0;
}

.task-item {
  padding: 10px 0;
  border-bottom: 1px solid #eee;
  cursor: pointer;
  transition: background-color 0.3s;
}

.task-item:hover {
  background-color: #f5f5f5;
}

.task-item:last-child {
  border-bottom: none;
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
  width: 100%;
  max-width: 600px;
  padding: 12px;
  font-size: 1.2rem;
  text-align: center;
  border: none;
  cursor: pointer;
  border-radius: 10px;
  background: #000000;
  color: white;
}

.create-task-btn:hover {
  background: #333;
}

/* Responsividade */
@media (max-width: 768px) {
  .tasks-container {
    grid-template-columns: 1fr; /* Uma coluna no mobile */
  }

  .tasks-section {
    width: 100%; /* Preenche toda a largura no mobile */
  }
}
</style>