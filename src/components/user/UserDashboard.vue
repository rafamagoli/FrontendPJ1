<template>
  <div id="dashboard">
    <!-- Sidebar/ Barra preta lateral-->
    <!-- Conteúdo principal (parte branca) -->
    <div class="main-content">
  

      <!-- Cards Section -->
      <section class="cards">
        <!-- Tasks card -->
        <div class="card tasks-card">
          <h2>Tasks Overview</h2>
          <div class="sub-box">Human Resources</div>
          <div class="sub-box">Canteen</div>
          <div class="sub-box">Technology</div>
          <div class="sub-box">Finance</div>
        </div>

        <!-- Employees card -->
        <div class="card employees-card">
          <h2>Employee Overview</h2>
          <div class="sub-box" @click="employeeList">View All</div>
          <div class="sub-box" @click="employeeAdd">Add a New Employee</div>
        </div>

        <!-- Calendar card -->
        <div class="card">
          <h2>Reservations</h2>
          <div class="calendar-card">
            <!-- FullCalendar component displays a calendar -->
            <FullCalendar :options="calendarOptions" />
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
// Import FullCalendar and its plugins
import FullCalendar from "@fullcalendar/vue3"; // FullCalendar Vue integration
import dayGridPlugin from "@fullcalendar/daygrid"; // Day grid plugin for calendar views

export default {
  components: { FullCalendar }, // Register FullCalendar as a component
  data() {
    return {
      //Username
      userName: "Bulma Garcia",
      // Calendar configuration options
      calendarOptions: {
        plugins: [dayGridPlugin], // Use the day grid plugin
        initialView: "dayGridMonth", // Set the initial calendar view
        height: "auto", // Make the calendar height adjust dynamically
        events: [
          { title: "Ana Garcia", start: "2024-12-15" }, // Example reservation event
          { title: "Felisberto Silva", start: "2024-12-20" }, // Another reservation event
        ],
      },
    };
  },
  methods: {
    // Logout method
    logout() {
      // Perform logout logic here (e.g., clearing tokens, user data)
      console.log("You have been logged out!"); // Optional: Log message to console
      // Redirect to login page
      this.$router.push("/login");
    },

    toggleSidebar() {
      const sidebar = document.querySelector(".sidebar");
      sidebar.classList.toggle("open");
    },
    employeeList() {
      this.$router.push("/employee/list");
    },  
    employeeAdd() {
      this.$router.push("/employee/add");
    },  
  },
};
</script>

<style scoped>

/* Card headings */
.tasks-card h2,
.employees-card h2,
.card h2 {
  margin-bottom: 10px; /* Space below heading */
}

.calendar-card {
  font-size: 10px;
  flex-direction: column;
  height: 100%; /* Full height of the card */
}

.calendar-card .fc {
  /* FullCalendar container */
  flex: 1; /* Allow FullCalendar to expand */
  width: 100%; /* Ensure it spans the card width */
}

</style>
