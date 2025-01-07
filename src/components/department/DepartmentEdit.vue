<template>
    <div id="department-edit">
      <div class="main-content">
        <h1>Edit Department</h1>
  
        <!-- Form Container -->
        <div class="form-container" v-if="!loading">
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
  
          <!-- Submit Button -->
          <div class="button-container">
            <button @click="updateDepartment" class="btn-update">Update</button>
          </div>
        </div>
  
        <!-- Loading State -->
        <div v-else>
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
    },
    async created() {
      await this.fetchDepartmentDetails();
    },
  };
  </script>
  
  <style scoped>
.main-content {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

h1 {
  text-align: center;
  margin-bottom: 20px;
  font-size: 1.5rem;
}

.form-container {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.form-group label {
  font-weight: bold;
  margin-bottom: 5px;
}

.form-group input {
  width: 100%;
  padding: 8px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.button-container {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.btn-update {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
}

.btn-update:hover {
  background-color: #0056b3;
}

p {
  text-align: center;
  font-size: 1rem;
}
</style>
