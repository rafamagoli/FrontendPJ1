<template>
    <div id="department-details-page" class="page-background">
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
import DepartmentService from "@/core/services/DepartmentService";
import UserService from "@/core/services/UserService";

export default {
    data() {
        return {
            department: null,
            employees: [],
            searchQuery: '',
        };
    },
    computed: {
        filteredActiveEmployees() {
            if (!this.employees) return [];
            return this.employees.filter(emp =>
                emp.active && emp.name.toLowerCase().includes(this.searchQuery.toLowerCase())
            );
        },
        inactiveEmployees() {
            if (!this.employees) return [];
            return this.employees.filter(emp => !emp.active);
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
            this.$router.push(`/department/edit/${this.department.id}`);
        },
        async fetchDepartmentDetails() {
            try {
                const departmentId = this.$route.params.id;

                const departmentResponse = await DepartmentService.getDepartmentById(departmentId);
                this.department = departmentResponse.data;

                const employeesResponse = await UserService.getUsersByDepartment(this.department.name);
                this.employees = employeesResponse.data;

            } catch (error) {
                console.error('Error fetching department details:', error);
                alert('Unable to fetch department details. Redirecting to list.');
                this.$router.push('/department/list');
            }
        }
    },
    async created() {
        await this.fetchDepartmentDetails();
    },
    watch: {
        '$route.params.id': {
            handler() {
                this.fetchDepartmentDetails();
            }
        }
    }
};
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