<template>
  <div id="task-edit" class="page-background">
    <div class="main-content">
      <section class="add-task-form">
        <h2>Update Task</h2>
        <form @submit.prevent="handleSubmit">
          <!-- Employee Selector -->
          <div class="form-group">
            <label for="employee">Assigned to {{ task.employee }}</label>
            <select id="employee" v-model="task.employee" required :disabled="currentUser.isEmployee">
              <option value="" disabled>Select an employee</option>
              <option
                v-for="employee in employees"
                :key="employee"
                :value="employee"
              >{{ employee }}</option>
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
import TaskService from "@/core/services/TaskService";
import UserService from "@/core/services/UserService";

export default {
  data() {
    return {
      currentUser: UserService.getCurrentUser(),
      task: {
        id: this.$route.params.id || null,
        title: "",
        employee: "",
        description: "",
        limitDate: "",
        completed: false,
      },
      employees: [],
    };
  },
  async created() {
    await this.fetchEmployees();

    try {

      let task = await TaskService.getTaskById(this.task.id);
      this.task.title = task.taskName;
      this.task.employee = task.assignedTo;
      this.task.description = task.description;
      this.task.limitDate = task.limit_date?.split("T")[0];
      this.task.completed = task.is_compleated;
      console.log("Mapped tasks:", task);
    } catch (error) {
      console.error("Error fetching tasks:", error.response?.data || error.message);
    }

  },
  methods: {
    async fetchEmployees() {
      try {
        const response = await UserService.getAllUsers();
        console.log("Fetched employees:", response.data);
        this.employees = response.data.map((user) => user.name);
      } catch (error) {
        console.error("Error fetching employees:", error.response?.data || error.message);
      }
    },
    async handleSubmit() {
      if (
        !this.task.employee ||
        !this.task.title ||
        !this.task.description ||
        !this.task.limitDate
      ) {
        alert("All fields are required!");
        return;
      }
      try {
        const updatedTask = {
          title: this.task.title,
          employee: this.task.employee,
          description: this.task.description,
          limitDate: this.task.limitDate,
          completed: this.task.completed,
        };
        console.log("Submitting updated task:", updatedTask); 
        await TaskService.updateTask(this.task.id, updatedTask);
        alert("Task updated successfully!");
        this.$router.push("/task/list");
      } catch (error) {
        console.error("Error updating task:", error.response?.data || error.message);
        alert("Unable to update task. Please try again later.");
      }
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