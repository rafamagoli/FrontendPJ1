<script>
import EmployeeAddFormInput from '../../components/employee/EmployeeAddFormInput.vue';
export default {
  components: {
    EmployeeAddFormInput,
  },
  data() {
    return {
      /* Estrutura padrão */
      userName: "Bulma Garcia",

      /* Estrutura da página Add Task */
      task: {
        employee: "", // Employee destinado à tarefa
        description: "", // Descrição da tarefa
        limitDate: "", // Data limite
      },
      employees: [
        "Bulma Garcia",
        "Pepper Stark",
        "Martini Silva",
        "Sansa Stark",
        "Roberto Silva",
        "Rafaela Oliveira",
        "Ana Garcia",
        "Caio Lacerda",
        "Lucas Oliveira",
        "Tony Stark",
        "Pepper Potts",
        ,
      ], // Lista de employees para a caixa de seleção
    };
  },
  methods: {
    handleSubmit() {
      if (
        !this.task.employee ||
        !this.task.description ||
        !this.task.limitDate
      ) {
        alert("All fields are required!");
        return;
      }
      console.log("Task created:", this.task);
      this.$router.push("/task/list"); // Redirecionar para a lista de tarefas
    },
    cancel() {
      this.$router.push("/task/list");
    },
    logout() {
      console.log("You have been logged out!");
      this.$router.push("/login");
    },
    toggleSidebar() {
      const sidebar = document.querySelector(".sidebar");
      sidebar.classList.toggle("open");
    },
  },
};
</script>

<template>
  <div id="addTask-page">
    <div class="main-content">
      <!-- Formulário de Adicionar Tarefa -->
      <section class="add-task-form">
        <h2>Add New Task</h2>
        <form @submit.prevent="handleSubmit">
          <!-- Employee Selector -->
          <div class="form-group">
            <label for="employee">Assigned to</label>
            <select id="employee" v-model="task.employee" required>
              <option value="" disabled>Select an employee</option>
              <option
                v-for="employee in employees"
                :key="employee"
                :value="employee"
              >
                {{ employee }}
              </option>
            </select>
          </div>

          <!-- Description -->
          <EmployeeAddFormInput
            identifier="description"
            name="Description"
            v-model="task.description"
            type="text"
          />

          <!-- Limit Date -->
          <div class="form-group">
            <label for="limitDate">Limit Date</label>
            <input
              id="limitDate"
              v-model="task.limitDate"
              type="date"
              required
            />
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
/* Add Task Form Styling */
.add-task-form {
  max-width: 600px;
  margin: 20px auto;
  background: #f5f5f5; /* Fundo levemente cinza */
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.add-task-form h2 {
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

.form-group input[type="date"] {
  cursor: pointer;
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
  color: white;
}

.cancel-button:hover,
.create-button:hover {
  background: rgb(158, 158, 158);
}

/* Responsiveness */
@media (max-width: 768px) {
  .add-task-form {
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
