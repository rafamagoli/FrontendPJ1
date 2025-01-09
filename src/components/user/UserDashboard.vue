<template>
  <div id="dashboard" class="page-background">
    <div class="main-content">
      <!-- Cards Section -->
      <section class="cards">
        <!-- Tasks Card -->
        <div class="card tasks-card">
          <h2>Tasks Overview</h2>
          <div class="sub-box" v-if="!currentUser.isEmployee" @click="TaskList">View All</div>
          <div class="sub-box" v-if="!currentUser.isEmployee" @click="TaskAdd">Add a New Task</div>
          <!-- Weekly Tasks Overview -->
          <div class="weekly-tasks">
            <h4>Tasks Due Next Week</h4>
            <ul>
              <li v-for="task in tasks" :key="task._id" class="task-item">
                <div class="task-title">{{ task.taskName }}</div>
                <div class="task-assigned">Assigned to: {{ task.assignedTo }}</div>
                <div class="task-date">Limit date: {{ formatDate(task.limit_date) }}</div>
              </li>
            </ul>
          </div>
        </div>

        <!-- Employees Card -->
        <div class="card employees-card" v-if="!currentUser.isEmployee">
          <h2>Employee Overview</h2>
          <div class="sub-box" @click="EmployeeList">View All</div>
          <div class="sub-box" @click="EmployeeAdd">Add a New Employee</div>
        </div>

        <!-- Calendar Card -->
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
import TaskService from "@/core/services/TaskService";
import ReservationService from "@/core/services/ReservationService";
import UserService from "@/core/services/UserService";

export default {
  components: { UserCalendar },
  data() {
    return {
      tasks: [],
      users: {},
      reservations: [],
      currentUser: UserService.getCurrentUser(),
    };
  },
  async mounted() {
    await this.loadTasks();
    await this.loadReservations();
  },
  methods: {
    async loadTasks() {
      try {
        const userResponse = await UserService.getAllUsers();
        this.users = userResponse.data.reduce((acc, user) => {
          acc[user.username] = user.name || user.username;
          return acc;
        }, {});
        console.log("User mapping:", this.users);

        const response = await TaskService.getTasksDueNextWeek();
        this.tasks = response.data.data.tasks.map((task) => ({
          ...task,
          assignedTo: this.users[task.assignedTo] || "Unknown",
          limitDate: task.limit_date.split("T")[0],
        }));

        console.log("Filtered Tasks:", this.tasks);
      } catch (error) {
        console.error("Error loading tasks:", error.response?.data || error.message);
      }
    },
    async loadReservations() {
      try {
        const response = await ReservationService.getReservations();
        this.reservations = response.data;
      } catch (error) {
        console.error("Error loading reservations:", error);
      }
    },
    formatDate(dateStr) {
      const options = { weekday: "short", year: "numeric", month: "short", day: "numeric" };
      return new Date(dateStr).toLocaleDateString(undefined, options);
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
.weekly-tasks h4 {
  padding: 15px 0; /* Ajuste o valor conforme necessário */
}
/* Weekly Tasks List */
.weekly-tasks ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.task-item {
  margin-bottom: 15px; /* Add space between tasks */
  padding: 10px; /* Add padding for a cleaner layout */
  background-color: #f9f9f9; /* Light background for readability */
  border-radius: 5px; /* Rounded corners */
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1); /* Subtle shadow */
  color: #333; /* Uniform text color */
}

.task-title {
  font-weight: bold;
  margin-bottom: 5px; /* Add space between title and other lines */
}

.task-assigned,
.task-date {
  font-size: 0.95rem; /* Slightly smaller font for details */
  margin-bottom: 3px;
}
</style>
