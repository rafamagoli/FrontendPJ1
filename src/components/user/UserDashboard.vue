<template>
  <div id="dashboard">
    <div class="main-content">
      <!-- Cards Section -->
      <section class="cards">
        <!-- Tasks card -->
        <div class="card tasks-card">
          <h2>Tasks Overview</h2>
          <div class="sub-box" @click="TaskList">View All</div>
          <div class="sub-box" @click="TaskAdd">Add a New Task</div>
          <!-- Weekly Tasks Overview -->
          <div class="weekly-tasks">
            <h4>This Week's Tasks</h4>
            <ul>
              <li v-for="task in weeklyTasks" :key="task.id">
                <span class="task-title">{{ task.title }}</span>
                <span class="task-date">Limit date: {{ formatDate(task.limitDate) }}</span>
              </li>
            </ul>
          </div>
        </div>

        <!-- Employees card -->
        <div class="card employees-card">
          <h2>Employee Overview</h2>
          <div class="sub-box" @click="EmployeeList">View All</div>
          <div class="sub-box" @click="EmployeeAdd">Add a New Employee</div>
        </div>

        <!-- Calendar card -->
        <div class="card">
          <h2>Reservations</h2>
          <div class="calendar-card">
            <UserCalendar :reservations="reservations" />
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import UserCalendar from "./UserCalendar.vue";

export default {
  components: { UserCalendar },
  data() {
    return {
      userName: "Bulma Garcia",
      tasks: [
        { id: 1, title: "Prepare meeting agenda", limitDate: "2024-12-18", completed: false },
        { id: 2, title: "Fix website bugs", limitDate: "2024-12-19", completed: false },
        { id: 3, title: "Submit project report", limitDate: "2024-12-20", completed: true },
        { id: 4, title: "Organize team event", limitDate: "2024-12-22", completed: false },
        { id: 5, title: "Finalize budget", limitDate: "2024-12-23", completed: false },
      ],
      reservations: [
        { id: 1, dish: "Grilled Fish", date: "2024-12-10" },
        { id: 2, dish: "Grilled Steak", date: "2024-12-15" },
        { id: 3, dish: "Shrimp Stew", date: "2024-12-19" },
      ],
    };
  },
  computed: {
    weeklyTasks() {
      const today = new Date();
      const startOfWeek = this.getStartOfWeek(today);
      const endOfWeek = this.getEndOfWeek(today);

      return this.tasks.filter((task) => {
        const dueDate = new Date(task.limitDate);
        return dueDate >= startOfWeek && dueDate <= endOfWeek;
      });
    },
  },
  methods: {
    formatDate(dateStr) {
      const options = { weekday: "short", year: "numeric", month: "short", day: "numeric" };
      return new Date(dateStr).toLocaleDateString(undefined, options);
    },
    getStartOfWeek(date) {
      const newDate = new Date(date); // Clone the date
      const day = newDate.getDay();
      const diff = newDate.getDate() - day + (day === 0 ? -6 : 1); // Adjust for Monday start
      newDate.setDate(diff);
      newDate.setHours(0, 0, 0, 0);
      return newDate;
    },
    getEndOfWeek(date) {
      const startOfWeek = this.getStartOfWeek(date);
      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 6);
      endOfWeek.setHours(23, 59, 59, 999);
      return endOfWeek;
    },
    TaskList() {
      this.$router.push("/task/list");
    },
    TaskAdd() {
      this.$router.push("/task/add");
    },
    EmployeeList() {
      this.$router.push("/employee/list");
    },
    EmployeeAdd() {
      this.$router.push("/employee/add");
    },
  },
};
</script>

<style scoped>
/* Weekly Tasks List */
.weekly-tasks {
  margin-top: 20px;
}

.weekly-tasks h3 {
  font-size: 1.2rem;
  margin-bottom: 10px;
}

.weekly-tasks ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.weekly-tasks li {
  background-color: white;
  padding: 10px;
  border-bottom: 1px solid #ddd;
  display: flex;
  justify-content: space-between;
}

.weekly-tasks li:last-child {
  border-bottom: none;
}

.task-title {
}

.task-date {
  font-size: 0.9rem;
  color: #666;
}

.tasks-card h2,
.employees-card h2,
.card h2 {
  margin-bottom: 10px;
}
</style>