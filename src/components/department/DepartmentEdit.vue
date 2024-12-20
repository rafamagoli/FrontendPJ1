<template>
    <div id="editDepartment-page">
        <div class="main-content">
            <h1 id="page-title">Edit Department</h1>

            <div class="form-container">
                <div class="form-content">
                    <!-- Department Selection -->
                    <div class="form-group">
                        <label for="departmentSelect">Department</label>
                        <select 
                            id="departmentSelect" 
                            v-model="department.name"
                            @click="fetchDepartments"
                        >
                            <option value="" disabled selected>Select department</option>
                            <option 
                                v-for="dept in departments" 
                                :key="dept.id" 
                                :value="dept.id"
                            >
                                {{ dept.name }}
                            </option>
                        </select>
                    </div>

                    <!-- Manager -->
                    <div class="form-group">
                        <label for="manager">Manager</label>
                        <select 
                            id="manager" 
                            v-model="department.manager"
                            @click="fetchManagers"
                        >
                            <option value="" disabled selected>Select manager</option>
                            <option 
                                v-for="manager in managers" 
                                :key="manager.id" 
                                :value="manager.id"
                            >
                                {{ manager.name }}
                            </option>
                        </select>
                    </div>

                    <!-- Employees -->
                    <div class="form-group">
                        <label for="employees">Employees</label>
                        <select 
                            id="employees" 
                            v-model="department.selectedEmployees"
                            @click="fetchEmployees"
                        >
                            <option value="" disabled selected>Select employees</option>
                            <option 
                                v-for="employee in employees" 
                                :key="employee.id" 
                                :value="employee.id"
                            >
                                {{ employee.name }}
                            </option>
                        </select>
                    </div>

                    <!-- Associated Discount -->
                    <div class="form-group">
                        <label for="discount">Associated Discount</label>
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
                        <button @click="updateDepartment" class="update-btn">
                            Update
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            department: {
                name: '',
                manager: '',
                selectedEmployees: '',
                discount: 0.00
            },
            departments: [], // Will be populated from API
            managers: [], // Will be populated from API
            employees: [], // Will be populated from API
            formattedDiscount: '0,00%'
        }
    },
    methods: {
        formatDiscount(event) {
            let value = event.target.value.replace(/[^0-9]/g, '');
            
            if (value === '') {
                this.formattedDiscount = '0,00%';
                this.department.discount = 0;
                return;
            }

            // Convert to number with 2 decimal places
            const numericValue = parseFloat(value) / 100;
            
            // Update the formatted display
            this.formattedDiscount = numericValue.toFixed(2).replace('.', ',') + '%';
            
            // Update the actual value
            this.department.discount = numericValue;
        },
        async fetchDepartments() {
            try {
                // Mock data - replace with actual API call
                this.departments = [
                    { id: 1, name: "Human Resources" },
                    { id: 2, name: "Technology" },
                    { id: 3, name: "Finance" },
                    { id: 4, name: "Marketing" }
                ];
            } catch (error) {
                console.error('Error fetching departments:', error);
            }
        },
        async fetchManagers() {
            try {
                // Mock data - replace with actual API call
                this.managers = [
                    { id: 1, name: "Ana Garcia" },
                    { id: 2, name: "John Smith" },
                    { id: 3, name: "Maria Silva" }
                ];
            } catch (error) {
                console.error('Error fetching managers:', error);
            }
        },
        async fetchEmployees() {
            try {
                // Mock data - replace with actual API call
                this.employees = [
                    { id: 1, name: "Ana Garcia" },
                    { id: 2, name: "Rafaela Magalhães" },
                    { id: 3, name: "Roberto Silva" }
                ];
            } catch (error) {
                console.error('Error fetching employees:', error);
            }
        },
        async updateDepartment() {
            try {
                console.log('Department to update:', this.department);
                // Implement your API call here
                // Example:
                // const response = await fetch('your-api-endpoint/departments/' + this.department.id, {
                //     method: 'PUT',
                //     headers: {
                //         'Content-Type': 'application/json',
                //     },
                //     body: JSON.stringify(this.department)
                // });
                
                // if (response.ok) {
                //     this.$router.push('/departments');
                // }
            } catch (error) {
                console.error('Error updating department:', error);
            }
        }
    }
}
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

/* Estilo base compartilhado */
.form-group input,
.form-group select {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 16px;
}

/* Estilo específico apenas para os selects */
.form-group select {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
    background-repeat: no-repeat;
    background-position: right 15px center;
    background-size: 1em;
    padding-right: 45px;
}

.button-container {
    display: flex;
    justify-content: flex-end;
    margin-top: 30px;
}

.update-btn {
    background-color: #000;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
    min-width: 100px;
}

.update-btn:hover {
    background-color: #333;
}

@media (max-width: 768px) {
    .form-container {
        margin: 0 20px;
    }
}
</style>