<template>
    <div id="department-details-page">
        <div class="main-content">
            <h1 id="page-title">{{ department ? department.name + ' Department' : 'Loading...' }}</h1>

            <div class="department-content" v-if="department">
                <!-- Left Section - Active Employees -->
                <div class="employees-section active-employees">
                    <h2>Active Employees</h2>
                    <div class="search-bar">
                        <input 
                            type="text" 
                            v-model="searchQuery"
                            placeholder="Search employees..."
                            class="search-input"
                        />
                        <span class="clear-search" @click="clearSearch">×</span>
                    </div>
                    <div class="employee-list">
                        <div 
                            v-for="employee in filteredActiveEmployees" 
                            :key="employee.id"
                            class="employee-item"
                        >
                            {{ employee.name }}
                        </div>
                    </div>
                </div>

                <!-- Right Section - Actions and Inactive Employees -->
                <div class="right-section">
                    <!-- Action Buttons -->
                    <div class="action-buttons">
                        <button @click="goToNewDepartment" class="action-btn">
                            Create New Department
                        </button>
                        <button @click="goToEditDepartment" class="action-btn">
                            Edit Department
                        </button>
                    </div>

                    <!-- Inactive Employees -->
                    <div class="employees-section inactive-employees">
                        <h2>Inactive Employees</h2>
                        <div class="employee-list">
                            <div 
                                v-for="employee in inactiveEmployees" 
                                :key="employee.id"
                                class="employee-item"
                            >
                                {{ employee.name }}
                            </div>
                        </div>
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
            department: null,
            searchQuery: '',
            // Mock data para simular API
            departmentsData: {
                1: {
                    id: 1,
                    name: 'Human Resources',
                    employees: [
                        { id: 1, name: "Ana Garcia", active: true },
                        { id: 2, name: "Felisberto Silva", active: true },
                        { id: 3, name: "Rafaela Oliveira", active: true },
                        { id: 4, name: "João Silva", active: false },
                    ]
                },
                2: {
                    id: 2,
                    name: 'Canteen',
                    employees: [
                        { id: 5, name: "Maria Santos", active: true },
                        { id: 6, name: "Pedro Costa", active: true },
                        { id: 7, name: "Clara Lima", active: false },
                    ]
                },
                3: {
                    id: 3,
                    name: 'Technology',
                    employees: [
                        { id: 8, name: "Lucas Silva", active: true },
                        { id: 9, name: "Bruno Costa", active: true },
                        { id: 10, name: "Ana Paula", active: false },
                    ]
                },
                4: {
                    id: 4,
                    name: 'Finance',
                    employees: [
                        { id: 11, name: "Carlos Santos", active: true },
                        { id: 12, name: "Mariana Lima", active: true },
                        { id: 13, name: "José Silva", active: false },
                    ]
                }
            }
        }
    },
    computed: {
        filteredActiveEmployees() {
            if (!this.department) return [];
            return this.department.employees.filter(emp => 
                emp.active && emp.name.toLowerCase().includes(this.searchQuery.toLowerCase())
            );
        },
        inactiveEmployees() {
            if (!this.department) return [];
            return this.department.employees.filter(emp => !emp.active);
        }
    },
    methods: {
        clearSearch() {
            this.searchQuery = '';
        },
        goToNewDepartment() {
            this.$router.push('/department/add');
        },
        goToEditDepartment() {
            this.$router.push('/department/edit');
        },
        fetchDepartmentDetails() {
            const departmentId = this.$route.params.id;
            this.department = this.departmentsData[departmentId];
            
            if (!this.department) {
                console.error('Department not found');
                this.$router.push('/department/list');
            }
        }
    },
    created() {
        this.fetchDepartmentDetails();
    },
    watch: {
        '$route.params.id': {
            handler() {
                this.fetchDepartmentDetails();
            }
        }
    }
}
</script>

<style scoped>
#page-title {
    font-size: 24px;
    margin-bottom: 30px;
    text-align: center;
}

.department-content {
    display: flex;
    gap: 30px;
    margin: 0 auto;
    max-width: 1200px;
}

.employees-section {
    background: #f6f6f6;
    border-radius: 8px;
    padding: 20px;
    flex: 1;
}

.active-employees {
    flex: 2;
}

.right-section {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.search-bar {
    position: relative;
    margin-bottom: 20px;
}

.search-input {
    width: 100%;
    padding: 8px;
    padding-right: 30px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 14px;
}

.clear-search {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
    color: #666;
    font-size: 18px;
}

.employee-list {
    max-height: 400px;
    overflow-y: auto;
}

.employee-item {
    padding: 10px;
    background: white;
    border: 1px solid #ddd;
    margin-bottom: 8px;
    border-radius: 4px;
}

.action-buttons {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.action-btn {
    width: 100%;
    padding: 10px;
    background-color: #000;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
}

.action-btn:hover {
    background-color: #333;
}

h2 {
    margin-bottom: 20px;
    font-size: 18px;
}

@media (max-width: 768px) {
    .department-content {
        flex-direction: column;
    }

    .right-section {
        order: -1;
    }

    .action-buttons {
        flex-direction: row;
        justify-content: center;
    }

    .action-btn {
        width: auto;
    }
}
</style>