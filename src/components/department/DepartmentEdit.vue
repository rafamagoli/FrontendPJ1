<template>
  <div id="department-edit">
    <div class="main-content">
      <section class="edit-department-form">
        <h2>Edit Department</h2>
        <form @submit.prevent="updateDepartment">
          <!-- Department Name -->
          <div class="form-group">
            <label for="department-name">Department Name</label>
            <input
            type="text"
            id="department-name"
            v-model="department.name"
            placeholder="Enter department name"
            required
            />
          </div>
          
          <!-- Canteen Discount -->
          <div class="form-group">
            <label for="canteen-discount">Canteen Discount (%)</label>
            <input
            type="number"
            id="canteen-discount"
            v-model.number="department.canteenDiscount"
            placeholder="Enter canteen discount"
            min="0"
            max="100"
            required
            />
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
      
      <!-- Loading State -->
      <div v-if="loading">
        <p>Loading department details...</p>
      </div>
    </div>
  </div>
</template>

<script>
import DepartmentService from "@/core/services/DepartmentService";

export default {
  data() {
    return {
      department: {
        name: "",
        canteenDiscount: 0,
      },
      loading: true,
    };
  },
  methods: {
    async fetchDepartmentDetails() {
      try {
        const departmentName = this.$route.params.name.trim();
        console.log("Fetching department details for:", departmentName);

        const response = await DepartmentService.getDepartmentByName(departmentName);
        console.log("API Response:", response.data);

        this.department = response.data;
        this.loading = false;
      } catch (error) {
        console.error("Error fetching department details:", error);
        alert("Unable to fetch department details. Redirecting to list.");
        this.$router.push("/department/list");
      }
    },

    async updateDepartment() {
      try {
        if (!this.department.name || this.department.canteenDiscount === null) {
          alert("Please fill out all fields.");
          return;
        }

        await DepartmentService.updateDepartment(this.department.name.trim(), {
          name: this.department.name,
          canteenDiscount: this.department.canteenDiscount,
        });

        alert("Department updated successfully!");
        this.$router.push("/department/list");
      } catch (error) {
        console.error("Error updating department:", error);
        alert("Error updating department: " + (error.response?.data?.message || error.message));
      }
    },

    cancel() {
      this.$router.push("/department/list"); // Redireciona para department list
    },
  },
  async created() {
    await this.fetchDepartmentDetails();
  },
};
</script>

<style scoped>
/* Form Container */
.edit-department-form {
  max-width: 600px;
  margin: 20px auto;
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.edit-department-form h2 {
  margin-bottom: 20px;
  font-size: 1.5rem;
  text-align: center;
}

/* Form Groups */
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
}

.form-group input:focus {
  border-color: #007bff;
  outline: none;
}

/* Action Buttons */
.form-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  gap: 10px;
}

.cancel-button,
.update-button {
  flex: 1;
  padding: 10px;
  font-size: 1rem;
  border-radius: 10px;
  cursor: pointer;
  text-align: center;
  background-color: black;
  color: white;
  border: none;
}

.cancel-button:hover,
.update-button:hover {
  background-color: #999999;
}

/* Loading Message */
p {
  text-align: center;
  font-size: 1rem;
}
</style>
