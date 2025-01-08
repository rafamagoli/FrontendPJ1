<script>
import EmployeeAddFormInput from "./EmployeeAddFormInput.vue";
import UserService from "@/core/services/UserService";

export default {
  components: {
    EmployeeAddFormInput,
  },
  data() {
    return {
      employee: {
        name: "",
        username: "",
        nif: "",
        password: "",
        confirmPassword: "",
      },
    };
  },
  async created() {
    const username = this.$route.params.username;

    try {
      // Busca os dados do funcionário pelo username
      const employeeResponse = await UserService.getUserByUsername(username);
      console.log("Employee Data from API:", employeeResponse);

      // Preenche os campos que serão exibidos
      this.employee = {
        name: employeeResponse.name,
        username: employeeResponse.username,
        nif: employeeResponse.nif,
        password: "",
        confirmPassword: "",
      };
    } catch (error) {
      console.error("Error fetching employee data:", error);
      alert("Failed to load employee data. Redirecting to dashboard.");
      this.$router.push("/user-dashboard");
    }
  },
  methods: {
    async handleSubmit() {
      if (this.employee.password !== this.employee.confirmPassword) {
        alert("Passwords do not match!");
        return;
      }

      try {
        // Atualiza apenas a senha do funcionário
        await UserService.changePassword(this.employee.username, {
          password: this.employee.password,
        });

        alert("Password updated successfully!");
        this.$router.push("/user-dashboard");
      } catch (error) {
        console.error("Error updating password:", error);
        alert(
          "Error updating password: " +
            (error.response?.data?.message || error.message)
        );
      }
    },
    cancel() {
      this.$router.push("/user-dashboard");
    },
  },
};
</script>

<template>
  <div id="changePassword-page" class="page-background">
    <div class="main-content">
      <!-- Change Password Form -->
      <section class="change-password-form">
        <h2>Change Password</h2>
        <form @submit.prevent="handleSubmit">
          <!-- Name (read-only) -->
          <div class="form-group">
            <label for="name">Name</label>
            <input id="name" type="text" v-model="employee.name" disabled />
          </div>

          <!-- Username (read-only) -->
          <div class="form-group">
            <label for="username">Username</label>
            <input id="username" type="text" v-model="employee.username" disabled />
          </div>

          <!-- NIF (read-only) -->
          <div class="form-group">
            <label for="nif">NIF</label>
            <input id="nif" type="text" v-model="employee.nif" disabled />
          </div>

          <!-- New Password -->
          <EmployeeAddFormInput
            identifier="password"
            name="New Password"
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

          <!-- Action Buttons -->
          <div class="form-actions">
            <button type="button" class="cancel-button" @click="cancel">
              Cancel
            </button>
            <button type="submit" class="update-button">Update Password</button>
          </div>
        </form>
      </section>
    </div>
  </div>
</template>

<style scoped>
/* Change Password Form Styling */
.change-password-form {
  max-width: 600px;
  margin: 20px auto;
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.change-password-form h2 {
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

.form-group input {
  width: 100%;
  padding: 8px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  background-color: #f5f5f5; /* Read-only background */
}

.form-group input:disabled {
  background: #f5f5f5;
  color: #999;
}

.form-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  gap: 10px; /* Add spacing between buttons */
}

.cancel-button,
.update-button {
  border-radius: 10px;
  width: 48%;
  padding: 10px;
  font-size: 1rem;
  border: none;
  cursor: pointer;
  background: #000000;
  color: white;
  text-align: center;
}

.cancel-button:hover,
.update-button:hover {
  background: #999999; /* Same hover effect for all buttons */
}

/* Responsiveness */
@media (max-width: 768px) {
  .change-password-form {
    padding: 15px;
  }

  .form-actions {
    flex-direction: column;
    gap: 10px;
  }

  .cancel-button,
  .update-button {
    width: 100%;
    margin-bottom: 10px;
  }
}
</style>