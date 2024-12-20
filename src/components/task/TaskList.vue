<template>
  <div id="tasks-page">
    <div class="main-content">
      <p></p>
      <h1 id="page-title">Tasks</h1>

      <!-- Tasks Management Section -->
      <section class="cards">
        <!-- All Tasks Card with Search and Checkbox -->
        <div class="card tasks-card">
          <h2>All Tasks</h2>
          <div class="search-bar">
            <input
              type="text"
              v-model="searchQuery"
              placeholder="Search tasks by title..."
              class="search-input"
            />
          </div>
          <div class="task-list">
            <ul>
              <li v-for="task in filteredTasks" :key="task.id">
                <input
                  type="checkbox"
                  :id="'task-' + task.id"
                  @change="markAsCompleted(task)"
                />
                <label :for="'task-' + task.id">{{ task.title }}</label>
              </li>
            </ul>
          </div>
        </div>

        <!-- Completed Tasks Card -->
        <div class="card completed-tasks-card">
          <h2>Completed Tasks</h2>
          <ul>
            <li v-for="task in completedTasks" :key="task.id">
              <div class="task-list">{{ task.title }}</div>
            </li>
          </ul>
        </div>

        <!-- Add New Task Button -->
        <div class="add-task-button">
          <button @click="goToAddTask" class="create-task-btn">
            Create New Task
          </button>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchQuery: "",
      tasks: [
        { id: 1, title: "Prepare meeting agenda", completed: false },
        { id: 2, title: "Fix website bugs", completed: false },
        { id: 3, title: "Update project documentation", completed: false },
        { id: 4, title: "Design mockup for new feature", completed: false },
        { id: 5, title: "Call the supplier", completed: false },
        { id: 6, title: "Organize team-building event", completed: true },
        { id: 7, title: "Submit annual report", completed: true },
      ],
    };
  },
  computed: {
    filteredTasks() {
      return this.tasks.filter(
        (task) =>
          !task.completed &&
          task.title.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
    completedTasks() {
      return this.tasks.filter((task) => task.completed);
    },
  },
  methods: {
    markAsCompleted(task) {
      task.completed = true;
    },
    goToAddTask() {
      this.$router.push("/addTask");
    },
  },
};
</script>

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

.task-list li {
  padding: 6px 0;
  border-bottom: 1px solid #eee;
  display: flex;
  align-items: center;
}

.task-list li:last-child {
  border-bottom: none;
}

.task-list input[type="checkbox"] {
  margin-right: 10px; /* aumenta a distância entre a checkbox e o texto */
}

.completed-tasks-card ul {
  list-style: none;
  padding: 0;
}

.completed-tasks-card li {
  padding: 5px 0;
  border-bottom: 1px solid #eee;
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
