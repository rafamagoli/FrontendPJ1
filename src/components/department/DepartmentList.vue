<template>
    <div id="departments-page">
      <div class="main-content">
        <p></p>
        <h1 id="page-title">Departments</h1>
  
        <!-- Departments List Container -->
        <section class="cards">
          <!-- Left Column -->
          <div class="card departments-card">
            <div class="department-grid">
              <div
                v-for="dept in filteredDepartments"
                :key="dept.id"
                class="department-box"
                @click="handleDepartmentClick(dept)"
              >
                {{ dept.name }}
              </div>
            </div>
          </div>
        </section>
  
        <!-- Button Container -->
        <div class="button-container">
          <button @click="goToAddDepartment" class="action-button">
            Create New Department
          </button>
        </div>
      </div>
    </div>
  </template>

<script>
export default {
  data() {
    return {
      userName: "Bulma Garcia",
      searchQuery: "",
      departments: [
        { id: 1, name: "Human Resources", active: true },
        { id: 2, name: "Canteen", active: true },
        { id: 3, name: "Technology", active: true },
        { id: 4, name: "Finance", active: true },
      ],
    };
  },
  computed: {
    filteredDepartments() {
      return this.departments.filter(
        (dept) =>
          dept.active &&
          dept.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
    inactiveDepartments() {
      return this.departments.filter((dept) => !dept.active);
    },
  },
  methods: {
    goToAddDepartment() {
      this.$router.push("/department/add");
    },
    handleDepartmentClick(department) {
      this.$router.push(`/department/${department.id}`);
    },
    logout() {
      console.log("You have been logged out!");
      this.$router.push("/login");
    },
  },
};
</script>

<style scoped>
/* Ajustes para unificar com código 2 */
.department-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 15px;
  padding: 15px;
}

.department-box {
  background: white;
  padding: 15px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
  text-align: center;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.department-box:hover {
  background-color: #f5f5f5;
}

.button-container {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  gap: 15px;
}

.action-button {
  flex: 1;
  padding: 10px;
  background-color: #000;
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s;
}

.action-button:hover {
  background-color: #333;
}

@media (max-width: 768px) {
  .button-container {
    flex-direction: column;
  }

  .action-button {
    width: 100%;
  }
}
</style>