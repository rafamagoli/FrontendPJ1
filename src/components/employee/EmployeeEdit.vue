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
        balance: "0.00",
        nif: "",
        role: "",
      },
      departments: [],
      loading: true,
    };
  },
  async created() {
    const username = decodeURIComponent(this.$route.params.username); // Decode username from the URL

    if (!username) {
      console.error("Employee username is missing.");
      alert("Employee username is missing in the URL.");
      this.$router.push("/employee/list");
      return;
    }

    try {
      const employeeResponse = await UserService.getUserByUsername(username);

      if (employeeResponse) {
        // Populate the form fields with the fetched data
        this.employee = {
          name: employeeResponse.name || "",
          department: employeeResponse.department || "",
          username: employeeResponse.username || "",
          balance: employeeResponse.balance || "0.00",
          nif: employeeResponse.nif || "",
          role: employeeResponse.role || "",
        };
      } else {
        console.error("Employee not found. Redirecting...");
        this.$router.push("/employee/list");
        return;
      }

      // Fetch departments for the dropdown
      const departmentsResponse = await DepartmentService.getAllDepartments();
      this.departments = departmentsResponse.data || [];
      this.loading = false;
    } catch (error) {
      console.error(
        "Error fetching employee or departments:",
        error.response?.data || error.message
      );
      alert("Failed to load data. Redirecting to employee list.");
      this.$router.push("/employee/list");
    }
  },
  methods: {
    async handleSubmit() {
      try {
        const formattedBalance = parseFloat(
          this.employee.balance.toString().replace(",", ".")
        );

        const updatedEmployee = {
          name: this.employee.name,
          department: this.employee.department,
          username: this.employee.username,
          balance: formattedBalance,
          nif: this.employee.nif,
          role: this.employee.role,
        };

        const username = decodeURIComponent(this.$route.params.username); // Decode username for the API call
        await UserService.updateUserByUsername(username, updatedEmployee);

        alert("Employee updated successfully!");
        this.$router.push("/employee/list");
      } catch (error) {
        console.error(
          "Error updating employee:",
          error.response?.data || error.message
        );
        alert(
          "Error updating employee: " +
            (error.response?.data?.message || error.message)
        );
      }
    },
    async markAsInactive() {
      try {
        const username = decodeURIComponent(this.$route.params.username); // Decode username for the API call

        await UserService.inactivateUserByUsername(username);

        alert("Employee marked as inactive successfully!");
        this.$router.push("/employee/list");
      } catch (error) {
        console.error(
          "Error marking employee as inactive:",
          error.response?.data || error.message
        );
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
  <div id="editEmployee-page" class="page-background">
    <div class="main-content">
      <!-- Edit Employee Form -->
      <section class="add-employee-form">
        <h2>Edit Employee</h2>
        <form @submit.prevent="handleSubmit">
          <!-- Name -->
          <EmployeeAddFormInput name="Name" identifier="name" v-model="employee.name" />

          <!-- Department -->
          <div class="form-group">
            <label for="department">Department</label>
            <select id="department" v-model="employee.department">
              <option value="" disabled>Select a department</option>
              <option v-for="dept in departments" :key="dept.id" :value="dept.name">
                {{ dept.name }}
              </option>
            </select>
          </div>

          <!-- Username -->
          <EmployeeAddFormInput identifier="username" name="Username" v-model="employee.username" disabled />

          <!-- Balance -->
          <EmployeeAddFormInput identifier="balance" name="Balance" v-model="employee.balance" />

          <!-- NIF -->
          <EmployeeAddFormInput identifier="nif" name="NIF" v-model="employee.nif" />

          <!-- Role -->
          <div class="form-group">
            <label for="role">Role</label>
            <select id="role" v-model="employee.role" required>
              <option value="" disabled>Select a role</option>
              <option value="Admin">Admin</option>
              <option value="Manager">Manager</option>
              <option value="Employee">Employee</option>
            </select>
          </div>

          <!-- Action Buttons -->
          <div class="form-actions">
            <button type="button" class="cancel-button" @click="cancel">Cancel</button>
            <button type="button" class="inactive-button" @click="markAsInactive">Inactive</button>
            <button type="submit" class="update-button">Update</button>
          </div>
        </form>
      </section>
    </div>
  </div>
</template>


<style scoped>
/* Edit Employee Form Styling */
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
.update-button,
.inactive-button {
  border-radius: 10px;
  width: 30%;
  padding: 10px;
  font-size: 1rem;
  border: none;
  cursor: pointer;
  background: #000000;
  color: rgb(255, 255, 255);
  text-align: center;
}

.cancel-button:hover,
.update-button:hover,
.inactive-button:hover {
  background: rgb(158, 158, 158);
}

/* Responsiveness */
@media (max-width: 768px) {
  .add-employee-form {
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
