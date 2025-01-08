<script>
import EmployeeAddFormInput from './EmployeeAddFormInput.vue';
import UserService from "@/core/services/UserService";
import DepartmentService from "@/core/services/DepartmentService";

export default {
  components: {
    EmployeeAddFormInput,
  },
  data() {
    return {
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

      departments: [],
    };
  },
  methods: {
    async fetchDepartments() {
      try {
        const response = await DepartmentService.getAllDepartments();
        this.departments = response.data;
      } catch (error) {
        console.error("Error fetching departments:", error);
        alert("Unable to fetch departments. Please try again.");
      }
    },

    async handleSubmit() {
      if (this.employee.password !== this.employee.confirmPassword) {
        alert("Passwords do not match!");
        return;
      }

      if (this.employee.role === 'Manager' && !this.isAdmin()) {
        alert("You are not authorized to create a manager.");
        return;
      }

      try {
        const formattedBalance = parseFloat(this.employee.balance.replace(',', '.'));

        const newEmployee = {
          username: this.employee.username,
          password: this.employee.password,
          name: this.employee.name,
          nif: this.employee.nif,
          departmentName: this.employee.department,
          role: this.employee.role,
        };

        await UserService.createUser(newEmployee);

        alert("Employee created successfully!");
        this.$router.push("/employee/list");
      } catch (error) {
        console.error("Error creating employee:", error);
        alert("Error creating employee: " + (error.response?.data?.message || error.message));
      }
    },

    cancel() {
      this.$router.push("/employee/list");
    },

    logout() {
      console.log("You have been logged out!");
      this.$router.push("/user/login");
    },

    isAdmin() {
      const currentUser = UserService.getCurrentUser();
      return currentUser && currentUser.isAdmin;
    },
  },
  async created() {
    await this.fetchDepartments();
  },
};
</script>

<template>
  <div id="addEmployee-page" class="page-background">
    <div class="main-content">
      <!-- Add Employee Form -->
      <section class="add-employee-form">
        <h2>Create New Employee</h2>
        <form @submit.prevent="handleSubmit">
          <!-- Name -->
          <EmployeeAddFormInput name="Name" identifier="name" v-model="employee.name" />

          <!-- Department (Dropdown) -->
          <div class="form-group">
            <label for="department">Department</label>
            <select id="department" v-model="employee.department" required>
              <option value="" disabled>Select department</option>
              <option v-for="dept in departments" :key="dept.id" :value="dept.name">
                {{ dept.name }}
              </option>
            </select>
          </div>

          <!-- Username -->
          <EmployeeAddFormInput identifier="username" name="Username" v-model="employee.username" />

          <!-- Password -->
          <EmployeeAddFormInput
            identifier="password"
            name="Password"
            v-model="employee.password"
            type="password"
          />

          <!-- Confirm Password -->
          <EmployeeAddFormInput
            identifier="confirm-password"
            name="Confirm Password"
            v-model="employee.confirmPassword"
            type="password"
          />

          <!-- NIF -->
          <EmployeeAddFormInput identifier="nif" name="NIF" v-model="employee.nif" />

          <!-- Role (Dropdown) -->
          <div class="form-group">
            <label for="role">Role</label>
            <select id="role" v-model="employee.role" required>
              <option value="" disabled>Select a role</option>
              <option value="Manager">Manager</option>
              <option value="Employee">Employee</option>
            </select>
          </div>

          <!-- Action Buttons -->
          <div class="form-actions">
            <button type="button" class="cancel-button" @click="cancel">Cancel</button>
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