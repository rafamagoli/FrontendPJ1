<script>
import EmployeeAddFormInput from "./EmployeeAddFormInput.vue";

export default {
  components: {
    EmployeeAddFormInput,
  },
  data() {
    return {
      userName: "Bulma Garcia", // Estrutura padrão
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
      departments: [
        { id: 1, name: "Human Resources" },
        { id: 2, name: "Canteen" },
        { id: 3, name: "Technology" },
        { id: 4, name: "Finance" },
      ],
    };
  },
  created() {
    const username = this.$route.params.username; // Obtém o username da rota

    // Mock para buscar dados do funcionário com base no username
    const mockEmployees = [
      {
        id: 1,
        name: "Bulma Garcia",
        department: 1,
        username: "bulma_g",
        balance: "500.00",
        password: "password123",
        confirmPassword: "password123",
        nif: "123456789",
        role: "Manager",
      },
      {
        id: 2,
        name: "Pepper Stark",
        department: 2,
        username: "pepper_s",
        balance: "150.00",
        password: "pepper123",
        confirmPassword: "pepper123",
        nif: "987654321",
        role: "Manager",
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
    ];

    // Busca o funcionário pelo username
    const employee = mockEmployees.find((e) => e.username === username);

    if (employee) {
      this.employee = { ...employee, confirmPassword: employee.password }; // Carrega os dados
    } else {
      console.error("Employee not found.");
      this.$router.push("/employee/list"); // Redireciona se não encontrar
    }

      // Simulação de API
      /*  async fetchEmployeeByUsername(username) {
        try {
          const response = await fetch(`/api/employees/${username}`);
          if (response.ok) {
            this.employee = await response.json();
          } else {
            console.error("Failed to fetch employee data");
            this.$router.push("/employee/list");
          }
        } catch (error) {
          console.error("Error fetching employee:", error);
          this.$router.push("/employee/list");
        }
      } */

  },
  methods: {
    handleSubmit() {
      if (this.employee.password !== this.employee.confirmPassword) {
        alert("Passwords do not match!");
        return;
      }
      console.log("Employee updated:", this.employee);

      this.$router.push("/employee/list");
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
      <!-- Cards Section -->
      <p></p>
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

          <!-- Balance -->
          <EmployeeAddFormInput
            identifier="balance"
            name="Balance"
            v-model="employee.balance"
          />

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
              <option value="Employee">Admin</option>
              <option value="Employee">Employee</option>
              <option value="HR Manager">Manager</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          <!-- Action Buttons -->
          <div class="form-actions">
            <button type="button" class="cancel-button" @click="cancel">
              Cancel
            </button>
            <button type="submit" class="update-button">Update</button>
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
}

.cancel-button:hover,
.update-button:hover {
  background: #999999;
}

/* Responsiveness */
@media (max-width: 768px) {
  .edit-employee-form {
    padding: 15px;
  }

  .form-actions {
    flex-direction: column;
  }

  .cancel-button,
  .update-button {
    width: 100%;
    margin-bottom: 10px;
  }

  .update-button {
    margin-bottom: 0;
  }
}
</style>
