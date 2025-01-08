<template>
  <div id="addDepartment-page" class="page-background">
    <div class="main-content">
      <!-- Add Department Form -->
      <section class="add-department-form">
        <h2>Create New Department</h2>
        <form @submit.prevent="createDepartment">
          <!-- Department Name -->
          <div class="form-group">
            <label for="departmentName">Department Name</label>
            <input 
              type="text" 
              id="departmentName" 
              v-model="department.name"
              placeholder="Enter department name"
              required
            />
          </div>

          <!-- Canteen Discount -->
          <div class="form-group">
            <label for="discount">Canteen Discount (%)</label>
            <input 
              type="text" 
              id="discount" 
              v-model="formattedDiscount"
              @input="formatDiscount"
              maxlength="7"
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

<script>
import DepartmentService from "@/core/services/DepartmentService";

export default {
  data() {
    return {
      department: {
        name: '',
        canteenDiscount: 0,
      },
      formattedDiscount: '0%',
    };
  },
  methods: {
    cancel() {
      this.$router.push("/department/list");
    },
    formatDiscount(event) {
      const value = event.target.value.replace(/[^0-9]/g, '');

      if (value === '') {
        this.formattedDiscount = '0%';
        this.department.canteenDiscount = 0;
        return;
      }

      const numericValue = parseInt(value, 10);
      this.formattedDiscount = `${numericValue}%`;
      this.department.canteenDiscount = numericValue;
    },
    async createDepartment() {
      try {
        if (!this.department.name.trim()) {
          alert('Department name is required');
          return;
        }

        if (this.department.canteenDiscount < 0 || this.department.canteenDiscount > 100) {
          alert('Canteen discount must be between 0 and 100');
          return;
        }

        const departmentData = {
          name: this.department.name.trim(),
          canteenDiscount: this.department.canteenDiscount,
        };

        console.log("Payload being sent:", departmentData);

        await DepartmentService.createDepartment(departmentData);

        alert('Department created successfully!');
        this.$router.push('/department/list');
      } catch (error) {
        console.error('Error creating department:', error.response?.data || error.message);
        alert('Error creating department: ' + (error.response?.data?.message || error.message));
      }
    },
  },
};
</script>

<style scoped>
/* Add Department Form Styling */
.add-department-form {
  max-width: 600px;
  margin: 20px auto;
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.add-department-form h2 {
  margin-bottom: 20px;
  font-size: 1.5rem;
  text-align: center;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.form-group input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
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
  background: #000;
  color: white;
}

.cancel-button:hover,
.create-button:hover {
  background: #333;
}

/* Responsiveness */
@media (max-width: 768px) {
  .add-department-form {
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