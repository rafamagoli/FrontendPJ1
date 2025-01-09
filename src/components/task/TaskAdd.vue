<script>
import EmployeeAddFormInput from "../../components/employee/EmployeeAddFormInput.vue";
import TaskService from "@/core/services/TaskService";
import UserService from "@/core/services/UserService";

export default {
  components: {
    EmployeeAddFormInput,
  },
  data() {
    return {
      task: {
        taskName: "",
        description: "",
        limitDate: "",
        assignedTo: "",
      },
      employees: [],
    };
  },
  methods: {
    async fetchEmployees() {
      try {
        const currentUser = UserService.getCurrentUser();
        let filteredUsers = [];

        if (currentUser.isAdmin) {
          // Admin can fetch all employees except other admins
          const allUsersResponse = await UserService.getAllUsers();
          const allUsers = allUsersResponse.data;
          filteredUsers = allUsers.filter(
            (user) => user.role !== "Admin"
          );
        } else if (currentUser.isManager) {
          // Managers fetch users from their own department
          const departmentName = currentUser.department;
          const response = await UserService.getUsersByDepartment(departmentName);
          filteredUsers = response.data.filter(
            (user) => user.username !== currentUser.username
          );
        }

        // Fetch and map usernames to their names
        this.employees = filteredUsers.map((user) => ({
          username: user.username,
          name: user.name || user.username, // Default to username if name is unavailable
        })).sort((a, b) => a.name.localeCompare(b.name));

        console.log("Filtered and Sorted Employees:", this.employees);
      } catch (error) {
        console.error("Error fetching employees:", error);
        alert("Unable to fetch employees. Please try again later.");
      }
    },
    async handleSubmit() {
      if (
        !this.task.taskName ||
        !this.task.description ||
        !this.task.limitDate ||
        !this.task.assignedTo
      ) {
        alert("All fields are required!");
        return;
      }

      try {
        const taskData = {
          taskName: this.task.taskName,
          description: this.task.description,
          limit_date: this.task.limitDate,
          assignedTo: this.task.assignedTo,
          isCompleted: false,
        };

        await TaskService.createTask(taskData);
        console.log("Task created:", taskData);

        alert("Task created successfully!");
        this.$router.push("/task/list");
      } catch (error) {
        console.error("Error creating task:", error);
        alert(
          "Unable to create task. Please try again later: " +
            (error.response?.data?.message || error.message)
        );
      }
    },
    cancel() {
      this.$router.push("/task/list");
    },
    toggleSidebar() {
      const sidebar = document.querySelector(".sidebar");
      sidebar.classList.toggle("open");
    },
  },
  async created() {
    await this.fetchEmployees();
  },
};
</script>

<template>
  <div id="addTask-page" class="page-background">
    <div class="main-content">
      <!-- Add Task Form -->
      <section class="add-task-form">
        <h2>Create New Task</h2>
        <form @submit.prevent="handleSubmit">
          <!-- Task Name -->
          <EmployeeAddFormInput
            identifier="taskName"
            name="Task Name"
            v-model="task.taskName"
            type="text"
          />

          <!-- Employee Selector -->
          <div class="form-group">
            <label for="employee">Assigned to</label>
            <select id="employee" v-model="task.assignedTo" required>
              <option value="" disabled>Select an employee</option>
              <option v-for="employee in employees" :key="employee.username" :value="employee.username">
                {{ employee.username }}
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
            <button type="button" class="cancel-button" @click="cancel">Cancel</button>
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
  background: white; /* Fundo levemente cinza */
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
