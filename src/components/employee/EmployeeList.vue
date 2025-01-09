<script>
import UserService from "@/core/services/UserService";

export default {
  data() {
    return {
      searchQuery: "",
      employees: [],
      currentUser: UserService.getCurrentUser(),
    };
  },
  computed: {
    filteredEmployees() {
      return this.employees.filter(
        (employee) =>
          employee.role !== "Inactive" &&
          employee.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
    inactiveEmployees() {
      return this.employees.filter((employee) => employee.role === "Inactive");
    },
  },
  methods: {
    goToAddEmployee() {
      this.$router.push("/employee/add");
    },
    handleEmployeeClick(employee) {
      this.$router.push(`/employee/edit/${employee.username}`);
    },
    async fetchEmployees() {
      try {
        let response;

        // Check user role and fetch employees accordingly
        if (this.currentUser.isAdmin) {
          response = await UserService.getAllUsers();
        } else if (this.currentUser.isManager) {
          response = await UserService.getUsersByDepartment(
            this.currentUser.department
          );
        } else {
          console.error("Unauthorized role to fetch employees.");
          return;
        }

        // Map employee data, ensure name fallback, and sort alphabetically
        this.employees = response.data
          .map((employee) => ({
            ...employee,
            name: employee.name || "Unknown",
          }))
          .sort((a, b) => a.name.localeCompare(b.name));
      } catch (error) {
        console.error("Error fetching employees:", error);
        alert("Failed to load employees. Please try again.");
      }
    },
  },
  async created() {
    await this.fetchEmployees();
  },
};
</script>

<template>
  <div id="employees-page" class="page-background">
    <div class="main-content">
      <h1 id="page-title">Employees</h1>
      <!-- Employee Management Section -->
      <section class="cards">
        <!-- Active Employees -->
        <div class="card employees-card">
          <h2>Active Employees</h2>
          <div class="search-bar">
            <input
              type="text"
              v-model="searchQuery"
              placeholder="Search employees by name..."
              class="search-input"
            />
          </div>
          <div class="employee-list">
            <ul>
              <li
                v-for="employee in filteredEmployees"
                :key="employee.id"
                @click="handleEmployeeClick(employee)"
                class="employee-item"
              >
                {{ employee.name }}
              </li>
            </ul>
          </div>
        </div>

        <!-- Inactive Employees -->
        <div class="card inactive-employees-card">
          <h2>Inactive Employees</h2>
          <ul>
            <li
              v-for="employee in inactiveEmployees"
              :key="employee.id"
              @click="handleEmployeeClick(employee)"
              class="employee-item"
            >
              {{ employee.name }}
            </li>
          </ul>
        </div>
      </section>

      <!-- Add New Employee Button -->
      <div class="create-employee-container" v-if="currentUser.isAdmin">
        <button @click="goToAddEmployee" class="create-employee-btn">
          Create New Employee
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

.employee-list {
  max-height: 200px;
  overflow-y: auto;
  border: 1px solid #ddd;
  padding: 10px;
  background: #fff;
}

.employee-list ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.employee-item {
  padding: 6px 0;
  border-bottom: 1px solid #eee;
  cursor: pointer;
  transition: background-color 0.3s;
}

.employee-item:hover {
  background-color: #f5f5f5;
}

.employee-list li:last-child {
  border-bottom: none;
}

.inactive-employees-card ul {
  list-style: none;
  padding: 0;
}

.inactive-employees-card li {
  padding: 5px 0;
  border-bottom: 1px solid #eee;
  cursor: pointer;
  transition: background-color 0.3s;
}

.inactive-employees-card li:hover {
  background-color: #f5f5f5;
}

.inactive-employees-card li:last-child {
  border-bottom: none;
}

.create-employee-container {
  display: flex;
  justify-content: center;
  margin-top: 20px;
  position: relative;
}

.create-employee-btn {
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

.create-employee-btn:hover {
  background: #333;
}
</style>
