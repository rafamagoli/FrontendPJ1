<script>
import TaskService from "@/core/services/TaskService";
import UserService from "@/core/services/UserService";


export default {
  data() {
    return {
      searchQuery: "",
      tasks: [],
      currentUser: UserService.getCurrentUser(), // Armazena o usuário atual
    };
  },
  computed: {
    filteredTasks() {
      return this.tasks.filter((task) =>
        task.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
    activeTasks() {
      return this.tasks.filter((task) => !task.completed);
    },
    completedTasks() {
      return this.tasks.filter((task) => task.completed);
    },
  },
  methods: {
    goToAddTask() {
      this.$router.push("/task/add");
    },
    handleTaskClick(task) {
      this.$router.push(`/task/edit/${task.id}`);
    },
    loadCurrentUser() {
      // Obtém o usuário atual do UserService
      console.log("Current User:", this.currentUser); // Para debug
    },
  },
  async mounted() {
    try {
      this.tasks = await TaskService.getAllTasks();
      console.log("Mapped tasks:", this.tasks);
    } catch (error) {
      console.error("Error fetching tasks:", error.response?.data || error.message);
    }
  },
};
</script>

<template>
  <div id="tasks-page" class="page-background">
    <div class="main-content">
      <h1 id="page-title">Tasks</h1>

      <!-- Task Management Section -->
      <section class="cards">
        <!-- Active Tasks -->
        <div class="card tasks-card">
          <h2>Active Tasks</h2>
          <div class="search-bar">
            <input
              type="text"
              v-model="searchQuery"
              placeholder="Search tasks by name..."
              class="search-input"
            />
          </div>
          <div class="task-list">
            <ul>
              <li
                v-for="task in filteredTasks"
                :key="task.id"
                @click="handleTaskClick(task)"
                class="task-item"
              >
                {{ task.name }}
              </li>
            </ul>
          </div>
        </div>
        <!-- Completed Tasks -->
        <div class="card completed-tasks-card">
          <h2>Completed Tasks</h2>
          <ul>
            <li
              v-for="task in completedTasks"
              :key="task.id"
              @click="handleTaskClick(task)"
              class="task-item"
            >
              {{ task.name }}
            </li>
          </ul>
        </div>

        <!-- Add New Task Button -->
        <div v-if="!currentUser.isEmployee" class="add-task-button">
          <button @click="goToAddTask" class="create-task-btn">
            Create New Task
          </button>
        </div>
      </section>
    </div>
  </div>
</template>


<style scoped>
#page-title {
  padding-top: 15px;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}

.search-bar {
  margin-bottom: 10px;
}

.search-input {
  width: 100%;
  padding: 3.5px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 1px;
}

.task-list {
  max-height: 200px;
  overflow-y: auto;
  border: 1px solid #ddd;
  padding: 10px;
  background: #fff;
}

.task-list ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.task-item {
  padding: 6px 0;
  border-bottom: 1px solid #eee;
  cursor: pointer;
  transition: background-color 0.3s;
}

.task-item:hover {
  background-color: #f5f5f5;
}

.task-list li:last-child {
  border-bottom: none;
}

.completed-tasks-card ul {
  list-style: none;
  padding: 0;
}

.completed-tasks-card li {
  padding: 5px 0;
  border-bottom: 1px solid #eee;
  cursor: pointer;
  transition: background-color 0.3s;
}

.completed-tasks-card li:hover {
  background-color: #f5f5f5;
}

.completed-tasks-card li:last-child {
  border-bottom: none;
}

.create-task-btn {
  display: block;
  width: 90%;
  padding: 10px;
  background-color: #000000;
  color: white;
  border: none;
  border-radius: 10px;
  box-shadow: #333;
  font-size: 1rem;
  cursor: pointer;
}

.create-task-btn:hover {
  background-color: #a4a4a4;
}
</style>
