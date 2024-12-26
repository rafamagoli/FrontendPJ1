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

                    <!-- Manager -->
                    <div class="form-group">
                        <label for="manager">Manager</label>
                        <select 
                            id="manager" 
                            v-model="department.managerUsername"
                            @click="fetchManagers"
                        >
                            <option value="" disabled selected>Select manager</option>
                            <option 
                                v-for="manager in managers" 
                                :key="manager.id" 
                                :value="manager.username"
                            >
                                {{ manager.name }}
                            </option>
                        </select>
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
export default {
    data() {
        return {
            department: {
                name: '',
                managerUsername: '',
                canteenDiscount: 0
            },
            managers: [], 
            formattedDiscount: '0,00%'
        }
    },
    methods: {
        formatDiscount(event) {
            let value = event.target.value.replace(/[^0-9]/g, '');
            
            if (value === '') {
                this.formattedDiscount = '0,00%';
                this.department.canteenDiscount = 0;
                return;
            }

            const numericValue = parseFloat(value) / 100;
            this.formattedDiscount = numericValue.toFixed(2).replace('.', ',') + '%';
            this.department.canteenDiscount = numericValue;
        },
        async fetchManagers() {
            try {
                const response = await fetch('http://localhost:8080/api/users/managers');
                if (response.ok) {
                    this.managers = await response.json();
                }
            } catch (error) {
                console.error('Error fetching managers:', error);
                alert('Error fetching managers. Please try again.');
            }
        },
        async createDepartment() {
            try {
                // Validação
                if (!this.department.name) {
                    alert('Department name is required');
                    return;
                }

                const response = await fetch('http://localhost:8080/api/departments', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        name: this.department.name,
                        managerUsername: this.department.managerUsername || undefined,
                        canteenDiscount: this.department.canteenDiscount
                    })
                });

                if (response.ok) {
                    alert('Department created successfully!');
                    this.$router.push('/departments');
                } else {
                    const error = await response.json();
                    throw new Error(error.message || error.error || 'Failed to create department');
                }
            } catch (error) {
                console.error('Error creating department:', error);
                alert('Error creating department: ' + error.message);
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