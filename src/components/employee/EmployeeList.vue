<script>
export default {
  data() {
    return {
      userName: "Bulma Garcia",
      searchQuery: "",
      employees: [
        {
          id: 1,
          name: "Bulma Garcia",
          department: 1, // Human Resources
          username: "bulma_g",
          balance: 500.0,
          role: "HR Manager",
          password: "password123",
          nif: "123456789",
          active: true,
        },
        {
          id: 2,
          name: "Pepper Stark",
          department: 2, // Canteen
          username: "pepper_s",
          balance: 150.0,
          role: "Canteen Manager",
          password: "pepper123",
          nif: "987654321",
          active: true,
        },
        {
          id: 3,
          name: "Martini Silva",
          department: 3, // Technology
          username: "martini_s",
          balance: 200.0,
          role: "Employee",
          password: "martini123",
          nif: "123789456",
          active: true,
        },
        {
          id: 4,
          name: "Sansa Stark",
          department: 4, // Finance
          username: "sansa_s",
          balance: 0.0,
          role: "Admin",
          password: "sansa123",
          nif: "987123654",
          active: true,
        },
        {
          id: 5,
          name: "Tony Stark",
          department: 3, // Technology
          username: "tony_s",
          balance: 5000.0,
          role: "Inactive",
          password: "tony123",
          nif: "567891234",
          active: false,
        },
      ],
    };
  },
  computed: {
    filteredEmployees() {
      return this.employees.filter(
        (employee) =>
          employee.active &&
          employee.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
    inactiveEmployees() {
      return this.employees.filter((employee) => !employee.active);
    },
  },
  methods: {
    goToAddEmployee() {
      this.$router.push("/employee/add");
    },
    handleEmployeeClick(employee) {
      // Navega para a página de edição do funcionário
      this.$router.push(`/employee/edit/${employee.id}`);
    },
    // Exemplo de chamada de API para obter funcionários
    // async fetchEmployees() {
    //   const response = await fetch('/api/employees');
    //   const data = await response.json();
    //   this.employees = data;
    // },
  },
};
</script>

<template>
  <div id="employees-page">
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

        <!-- Add New Employee Button -->
        <div class="add-employee-button">
          <button @click="goToAddEmployee" class="create-employee-btn">
            Create New Employee
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

.create-employee-btn {
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

.create-employee-btn:hover {
  background-color: #a4a4a4;
}
</style>