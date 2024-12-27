<template>
  <div id="task-edit">
    <div class="main-content">
      <section class="add-task-form">
        <h2>Update Task</h2>
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

          <!-- Title -->
          <div class="form-group">
            <label for="title">Title</label>
            <input id="title" v-model="task.title" type="text" required />
          </div>

          <!-- Description -->
          <div class="form-group">
            <label for="description">Description</label>
            <input
              id="description"
              v-model="task.description"
              type="text"
              required
            />
          </div>

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

          <!-- Mark as Complete Checkbox -->
          <div class="form-group checkbox-group">
            <label>
              <input
                type="checkbox"
                v-model="task.completed"
                class="complete-checkbox"
              />
              Mark as Complete
            </label>
          </div>

          <!-- Action Buttons -->
          <div class="form-actions">
            <button type="button" class="cancel-button" @click="cancel">
              Cancel
            </button>
            <button type="submit" class="create-button">Update</button>
          </div>
        </form>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      task: {
        id: null,
        title: "",
        employee: "",
        description: "",
        limitDate: "",
        completed: false,
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
      ],
    };
  },
  created() {
    const taskId = this.$route.params.id; // Obtem o ID da rota
    if (taskId) {
      this.fetchTaskData(taskId); // Busca os dados da tarefa
    } else {
      console.error("No task ID found. Redirecting...");
      this.$router.push("/task/list");
    }
  },
  methods: {
    fetchTaskData(taskId) {
      // Simulação de fetch com base no ID (substituir com uma API real)
      const mockTasks = [
        {
          id: "1",
          title: "Prepare meeting agenda",
          employee: "Bulma Garcia",
          description: "Discuss quarterly goals.",
          limitDate: "2024-01-15",
          completed: false,
        },
        {
          id: "2",
          title: "Fix website bugs",
          employee: "Pepper Stark",
          description: "Resolve UI issues on the home page.",
          limitDate: "2024-01-20",
          completed: true,
        },
        {
          id: "3",
          title: "Update project documentation",
          employee: "Martini Silva",
          description: "Revise and update the technical documentation.",
          limitDate: "2024-02-01",
          completed: false,
        },
        {
          id: "4",
          title: "Design mockup for new feature",
          employee: "Sansa Stark",
          description: "Create UI/UX mockups for the upcoming release.",
          limitDate: "2024-02-15",
          completed: false,
        },
        {
          id: "5",
          title: "Call the supplier",
          employee: "Roberto Silva",
          description: "Confirm delivery schedule for new office supplies.",
          limitDate: "2024-01-10",
          completed: false,
        },
        {
          id: "6",
          title: "Organize team-building event",
          employee: "Rafaela Oliveira",
          description: "Plan and organize a team-building event for Q1.",
          limitDate: "2024-01-25",
          completed: true,
        },
        {
          id: "7",
          title: "Submit annual report",
          employee: "Ana Garcia",
          description: "Finalize and submit the company's annual report.",
          limitDate: "2024-01-30",
          completed: true,
        },
      ];

      const task = mockTasks.find((t) => t.id === taskId.toString());

      if (task) {
        this.task = { ...task };
      } else {
        console.error("Task not found. Redirecting...");
        this.$router.push("/task/list");
      }
    },
    handleSubmit() {
      if (
        !this.task.employee ||
        !this.task.title ||
        !this.task.description ||
        !this.task.limitDate
      ) {
        alert("All fields are required!");
        return;
      }
      console.log("Task updated:", this.task);
      this.$router.push("/task/list");
    },
    cancel() {
      this.$router.push("/task/list");
    },
  },
};
</script>

<style scoped>
/* Form styles */
.add-task-form {
  max-width: 600px;
  margin: 20px auto;
  background: #f5f5f5;
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
}

.complete-checkbox {
  margin-right: 10px;
}

.checkbox-group label {
  display: flex;
  align-items: center;
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
</style>