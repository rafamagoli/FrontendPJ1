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
      this.task.completed = task.isCompleted;
      console.log("Fetched task:", task);
    } catch (error) {
      console.error("Error fetching task:", error.response?.data || error.message);
    }
  },
  methods: {
    async fetchEmployees() {
      try {
        const response = await UserService.getAllUsers();
        const allUsers = response.data;
        const currentUser = this.currentUser;

        let filteredUsers = [];

        if (currentUser.isAdmin) {
          filteredUsers = allUsers.filter(
            (user) => user.role !== "Admin" || user.username === currentUser.username
          );
        } else if (currentUser.isManager) {
          filteredUsers = allUsers.filter(
            (user) => user.department === currentUser.department && user.role === "Employee"
          );
        }

        this.employees = filteredUsers.map((user) => user.username);
        console.log("Filtered Employees:", this.employees);
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
          taskName: this.task.title,
          assignedTo: this.task.employee,
          description: this.task.description,
          limit_date: this.task.limitDate,
          isCompleted: this.task.completed,
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

<template>
  <div id="task-edit" class="page-background">
    <div class="main-content">
      <section class="add-task-form">
        <h2>Update Task</h2>
        <form @submit.prevent="handleSubmit">
          <!-- Employee Selector -->
          <div class="form-group">
            <label for="employee">Assigned to</label>
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

.checkbox-group label {
  display: flex;
  align-items: center;
  cursor: pointer;
  white-space: nowrap; /* Prevent text from wrapping */
}

.form-group input,
.form-group select {
  width: 100%;
  padding: 8px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

/* Adjusted checkbox styles */
.checkbox-group {
  display: flex;
  align-items: center;
  justify-content: flex-start; /* Align items to the left */
}

.checkbox-group label {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.complete-checkbox {
  margin-right: 10px; /* Add space between checkbox and label */
  transform: scale(1.5); /* Increase checkbox size */
  width: 20px; /* Optional: explicitly set width */
  height: 20px; /* Optional: explicitly set height */
  margin-left: 3px; /* Align with the start of the container */
}

.form-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  gap: 10px;
}

.cancel-button,
.create-button {
  border-radius: 10px;
  flex: 1;
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

