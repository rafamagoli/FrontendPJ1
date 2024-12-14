<template>
  <div id="employees-page">


    <div class="main-content">
      <!-- Cards Section -->
       <p></p>
       <h1 id="page-title">Employees</h1>
      <!-- Employee Management Section -->
      <section class="cards">
        <!-- Employees Card with Search and Scroll -->
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
              <li v-for="employee in filteredEmployees" :key="employee.id">
                {{ employee.name }}
              </li>
            </ul>
          </div>
        </div>

        <!-- Inactive Employees Card -->
        <div class="card inactive-employees-card">
          <h2>Inactive Employees</h2>
          <ul>
            <li v-for="employee in inactiveEmployees" :key="employee.id">
              <div class="employee-list">{{ employee.name }}</div>
            </li>
          </ul>
        </div>

        <!-- Add New Employee Button -->
        <div class=" add-employee-button">
          <button @click="goToAddEmployee" class="create-employee-btn">
            Create New Employee
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
      //Username
      userName: "Bulma Garcia",
      searchQuery: "",
      employees: [
        { id: 1, name: "Bulma Garcia", active: true },
        { id: 2, name: "Pepper Stark", active: true },
        { id: 3, name: "Martini Silva", active: true },
        { id: 4, name: "Sansa Stark", active: true },
        { id: 5, name: "Roberto Silva", active: true },
        { id: 6, name: "Rafaela Oliveira", active: true },        
        { id: 7, name: "Ana Garcia", active: true },
        { id: 8, name: "Caio Lacerda", active: true },       
        { id: 9, name: "Lucas Oliveira", active: true },
        { id: 10, name: "Tony Stark", active: false },
        { id: 11, name: "Pepper Potts", active: false },
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
    //LEVA para a página de criar novo employee
    goToAddEmployee() {
      this.$router.push("/addEmployee");
    },
    // Logout method
    logout() {
      // Perform logout logic here (e.g., clearing tokens, user data)
      console.log("You have been logged out!"); // Optional: Log message to console 
    
      // Redirect to login page
      this.$router.push("/login");
    },

    toggleMenu(event) {
      const parentItem = event.target.closest(".nav-item");
      if (parentItem) {
        parentItem.classList.toggle("active");

        const submenu = parentItem.querySelector(".submenu");
        if (submenu) {
          submenu.style.display =
            submenu.style.display === "block" ? "none" : "block";
        }
      }
    },

    toggleSidebar() {
      const sidebar = document.querySelector(".sidebar");
      sidebar.classList.toggle("open");
    },
  },
};
</script>

<style scoped>

#page-title {
    padding-top: 15px;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
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
.employee-list li {
  padding: 6px 0; /*distância entre os nomes*/
  border-bottom: 1px solid #eee;
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
  border-radius: 1px;
  box-shadow: #333;
  font-size: 1rem;
  cursor: pointer;
}
.create-employee-btn:hover {
  background-color: #a4a4a4;
}


/* ************************************** */
</style>
