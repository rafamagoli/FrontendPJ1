<script>
import EmployeeAddFormInput from './EmployeeAddFormInput.vue';
export default {
  components: {
    EmployeeAddFormInput
  },
    data() {
    return {
      /* PADRÃO DA ESTRUTURA DA PÁGINA ABAIXO */
      userName: "Bulma Garcia",
      /* FIM DO PADRÃO DA ESTRUTURA DA PÁGINA */

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
      this.$router.push("/employee/list"); // Redirect to employees page
    },
    cancel() {
      this.$router.push("/employee/list");
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
<template>
  <div id="addEmployee-page">
    <div class="main-content">

      <!-- Cards Section -->
      <p></p>
      <!-- Add Employee Form -->
      <section class="add-employee-form">
        <h2>Add New Employee</h2>
        <form @submit.prevent="handleSubmit">
          <!-- Name -->

          <EmployeeAddFormInput name="Name" identifier="name" v-model="employee.name"/>
          <!--
          <div class="form-group">
            <label for="name">Name</label>
            <input type="text" id="name" v-model="employee.name" required />
          </div>
          -->
          <!-- Department -->
          <EmployeeAddFormInput identifier="department" name="Department" v-model="employee.department"/>
          <!-- Username -->
          <EmployeeAddFormInput identifier="username" name="Username" v-model="employee.username"/>
          <!-- Balance -->
          <EmployeeAddFormInput identifier="balance" name="Balance" v-model="employee.balance"/> 
          <!-- Password -->
          <EmployeeAddFormInput identifier="password" name="Password" v-model="employee.password" type="password"/>
          <!-- Confirm Password -->
          <EmployeeAddFormInput identifier="confirm-password" name="Confirm Password" v-model="employee.confirmPassword" type="password"/>
          <!-- NIF -->
          <EmployeeAddFormInput identifier="nif" name="NIF" v-model="employee.nif" />
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



<style>

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
  border-radius: 10px;
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