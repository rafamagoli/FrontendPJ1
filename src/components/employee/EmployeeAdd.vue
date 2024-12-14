<template>
  <div id="addEmployee-page">
    <div class="main-content">

      <!-- Cards Section -->
      <p></p>
      <h1 id="page-title">Add Employee</h1>
      <!-- Add Employee Form -->
      <section class="add-employee-form">
        <h2>Add New Employee</h2>
        <form @submit.prevent="handleSubmit">
          <!-- Name -->
          <div class="form-group">
            <label for="name">Name</label>
            <input type="text" id="name" v-model="employee.name" required />
          </div>

          <!-- Department -->
          <div class="form-group">
            <label for="department">Department</label>
            <input
              type="text"
              id="department"
              v-model="employee.department"
              required
            />
          </div>

          <!-- Username -->
          <div class="form-group">
            <label for="username">Username</label>
            <input
              type="text"
              id="username"
              v-model="employee.username"
              required
            />
          </div>

          <!-- Balance -->
          <div class="form-group">
            <label for="balance">Balance</label>
            <input
              type="text"
              id="balance"
              v-model="employee.balance"
              disabled
            />
          </div>

          <!-- Password -->
          <div class="form-group">
            <label for="password">Password</label>
            <input
              type="password"
              id="password"
              v-model="employee.password"
              required
            />
          </div>

          <!-- Confirm Password -->
          <div class="form-group">
            <label for="confirm-password">Confirm Password</label>
            <input
              type="password"
              id="confirm-password"
              v-model="employee.confirmPassword"
              required
            />
          </div>

          <!-- NIF -->
          <div class="form-group">
            <label for="nif">NIF</label>
            <input type="text" id="nif" v-model="employee.nif" required />
          </div>

          <!-- Role -->
          <div class="form-group">
            <label for="role">Role</label>
            <select id="role" v-model="employee.role" required>
              <option value="" disabled>Select a role</option>
              <option value="Employee">Employee</option>
              <option value="HR Manager">HR Manager</option>
              <option value="Canteen Manager">Canteen Manager</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          <!-- Action Buttons -->
          <div class="form-actions">
            <button type="button" class="cancel-button" @click="cancel">
              Cancel
            </button>
            <button type="submit" class="create-button">Create</button>
          </div>
        </form>
      </section>
    </div>
  </div>
</template>

<script>
/* PADRÃO DA ESTRUTURA DA PÁGINA */

export default {
  data() {
    return {
      //Username
      /* PADRÃO DA ESTRUTURA DA PÁGINA */
      /* PADRÃO DA ESTRUTURA DA PÁGINA ABAIXO */
      userName: "Bulma Garcia",
      /* PADRÃO DA ESTRUTURA DA PÁGINA ACIMA */

      employee: {
        name: "",
        department: "",
        username: "",
        balance: "0,00",
        password: "",
        confirmPassword: "",
        nif: "",
        role: "",
      },
    };
  },

  methods: {
    handleSubmit() {
      if (this.employee.password !== this.employee.confirmPassword) {
        alert("Passwords do not match!");
        return;
      }
      console.log("Employee created:", this.employee);
      this.$router.push("/employeelist"); // Redirect to employees page
    },
    cancel() {
      this.$router.push("/employees");
    },




    // Logout Método
    /* PADRÃO DA ESTRUTURA DA PÁGINA INICIO */
    addEmployee() {
      this.$router.push("/addEmployee");
    },
    logout() {
      console.log("You have been logged out!"); // fazer funcionar

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
    /* PADRÃO DA ESTRUTURA DA PÁGINA FIM */

  },
};
</script>

<style scoped>

/* Add Employee Form Styling */
.add-employee-form {
  max-width: 600px;
  margin: 20px auto;
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.add-employee-form h2 {
  margin-bottom: 20px;
  font-size: 1.5rem;
  text-align: center;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  font-size: 0.9rem;
}

.form-group input,
.form-group select {
  width: 100%;
  padding: 8px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

.form-group input:disabled {
  background: #f5f5f5;
}

.form-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.cancel-button,
.create-button {
  width: 48%;
  padding: 10px;
  font-size: 1rem;
  border: none;
  cursor: pointer;
  background: #000000;
  color: rgb(255, 255, 255);
}

.cancel-button:hover,
.create-button:hover {
  background: rgb(158, 158, 158);
}

/* Responsiveness */
@media (max-width: 768px) {
  .add-employee-form {
    padding: 15px;
  }

  .form-actions {
    flex-direction: column;
  }

  .cancel-button,
  .create-button {
    width: 100%;
    margin-bottom: 10px;
  }

  .create-button {
    margin-bottom: 0;
  }
}

</style>