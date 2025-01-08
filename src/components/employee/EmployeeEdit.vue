<script>
import EmployeeAddFormInput from "./EmployeeAddFormInput.vue";
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
        balance: "",
        password: "",
        confirmPassword: "",
        nif: "",
        role: "",
      },
      departments: [],
    };
  },
  async created() {
    const username = this.$route.params.username;

    try {
      const employeeResponse = await UserService.getUserByUsername(username);
      console.log("Employee Data from API:", employeeResponse);

      this.employee = {
        ...employeeResponse,
        confirmPassword: employeeResponse.password || "",
      };

      const departmentsResponse = await DepartmentService.getAllDepartments();
      console.log("Departments Data from API:", departmentsResponse.data);

      this.departments = departmentsResponse.data;
    } catch (error) {
      console.error("Error fetching employee or departments:", error);
      alert("Failed to load data. Redirecting to employee list.");
      this.$router.push("/employee/list");
    }
  },
  methods: {
    async handleSubmit() {
      if (this.employee.password !== this.employee.confirmPassword) {
        alert("Passwords do not match!");
        return;
      }

      try {
        const formattedBalance = parseFloat(
          this.employee.balance.toString().replace(",", ".")
        );

        const updatedEmployee = {
          name: this.employee.name,
          department: this.employee.department,
          username: this.employee.username,
          balance: formattedBalance,
          password: this.employee.password,
          nif: this.employee.nif,
          role: this.employee.role,
        };

        await UserService.updateUserByUsername(
          this.employee.username,
          updatedEmployee
        );

        alert("Employee updated successfully!");
        this.$router.push("/employee/list");
      } catch (error) {
        console.error("Error updating employee:", error);
        alert(
          "Error updating employee: " +
            (error.response?.data?.message || error.message)
        );
      }
    },
    async markAsInactive() {
      try {
        await UserService.updateUserByUsername(this.employee.username, {
          role: "Inactive",
        });

        alert("Employee marked as inactive successfully!");
        this.$router.push("/employee/list");
      } catch (error) {
        console.error("Error marking employee as inactive:", error);
        alert(
          "Error inactivating employee: " +
            (error.response?.data?.message || error.message)
        );
      }
    },
    cancel() {
      this.$router.push("/employee/list");
    },
  },
};
</script>

<template>
  <div id="editEmployee-page">
    <div class="main-content">
      <!-- Edit Employee Form -->
      <section class="edit-employee-form">
        <h2>Edit Employee</h2>
        <form @submit.prevent="handleSubmit">
          <!-- Name -->
          <EmployeeAddFormInput
            name="Name"
            identifier="name"
            v-model="employee.name"
          />

          <!-- Department -->
          <div class="form-group">
            <label for="department">Department</label>
            <select id="department" v-model="employee.department" required>
              <option value="" disabled>Select a department</option>
              <option
                v-for="dept in departments"
                :key="dept.id"
                :value="dept.id"
              >
                {{ dept.name }}
              </option>
            </select>
          </div>

          <!-- Username -->
          <EmployeeAddFormInput
            identifier="username"
            name="Username"
            v-model="employee.username"
          />


          <!-- NIF -->
          <EmployeeAddFormInput
            identifier="nif"
            name="NIF"
            v-model="employee.nif"
          />

          <!-- Role -->
          <div class="form-group">
            <label for="role">Role</label>
            <select id="role" v-model="employee.role" required>
              <option value="" disabled>Select a role</option>
              <option value="Admin">Admin</option>
              <option value="Employee">Employee</option>
              <option value="HR Manager">Manager</option>
            </select>
          </div>

          <!-- Action Buttons -->
          <div class="form-actions">
            <button type="button" class="cancel-button" @click="cancel">
              Cancel
            </button>
            <button type="submit" class="update-button">Edit</button>
            <button type="button" class="inactive-button" @click="markAsInactive">
              Inactive Employee
            </button>
          </div>
        </form>
      </section>
    </div>
  </div>
</template>

<style scoped>
/* Edit Employee Form Styling */
.edit-employee-form {
  max-width: 600px;
  margin: 20px auto;
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.edit-employee-form h2 {
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
  gap: 10px; /* Add spacing between buttons */
}

.cancel-button,
.update-button,
.inactive-button { /* Apply same styles to all buttons */
  border-radius: 10px;
  width: 32%; /* Ensure all buttons are the same width */
  padding: 10px;
  font-size: 1rem;
  border: none;
  cursor: pointer;
  background: #000000;
  color: white;
  text-align: center;
}

.cancel-button:hover,
.update-button:hover,
.inactive-button:hover {
  background: #999999; /* Same hover effect for all buttons */
}

/* Responsiveness */
@media (max-width: 768px) {
  .edit-employee-form {
    padding: 15px;
  }

  .form-actions {
    flex-direction: column;
    gap: 10px;
  }

  .cancel-button,
  .update-button,
  .inactive-button {
    width: 100%;
    margin-bottom: 10px;
  }

  .inactive-button {
    margin-bottom: 0;
  }
}
</style>
