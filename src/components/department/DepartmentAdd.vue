<template>
  <div id="addDepartment-page">
      <div class="main-content">
          <h1 id="page-title">New Department</h1>

          <div class="form-container">
              <div class="form-content">
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

                  <!-- Associated Discount -->
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

                  <!-- Submit Button -->
                  <div class="button-container">
                      <button @click="createDepartment" class="create-btn">
                          Create
                      </button>
                  </div>
              </div>
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
        name: '',
        canteenDiscount: 0,
      },
      formattedDiscount: '0%',
    };
  },
  methods: {
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
        this.$router.push('/departments');
      } catch (error) {
        console.error('Error creating department:', error.response?.data || error.message);
        alert('Error creating department: ' + (error.response?.data?.message || error.message));
      }
    },
  },
};
</script>

<style scoped>

.form-container {
  background-color: #f6f5f5;
  padding: 20px;
  border-radius: 8px;
  max-width: 800px;
  margin: 0 auto;
  margin-top: 50px;
}

.form-content {
  padding: 20px;
}

.form-group {
  margin-bottom: 20px;
  position: relative;
}

.form-group label {
  display: block;
  font-weight: bold;
  margin-bottom: 8px;
}

.form-group input,
.form-group select {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
}

.form-group select {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 35px center;
  background-size: 1em;
  padding-right: 45px;
}

.button-container {
  display: flex;
  justify-content: flex-end;
  margin-top: 30px;
}

.create-btn {
  background-color: #000;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  min-width: 100px;
}

.create-btn:hover {
  background-color: #333;
}

@media (max-width: 768px) {
  .form-container {
      margin: 0 20px;
  }
}
</style>