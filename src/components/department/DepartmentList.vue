<template>
    <div id="departments-page">
        <div class="main-content">
            <p></p>
            <h1 id="page-title">Departments</h1>
            <!-- Departments List Container -->
            <div class="departments-container">
                <div class="card departments-card">
                    <div class="department-buttons">
                        <button 
                            v-for="dept in filteredDepartments" 
                            :key="dept.id" 
                            class="department-btn"
                            @click="handleDepartmentClick(dept)"
                        >
                            {{ dept.name }}
                        </button>
                    </div>
                </div>
            </div>

            <!-- Button Container -->
            <div class="button-container">
                <button @click="goToAddDepartment" class="create-department-btn">
                    Create New Department
                </button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            userName: "Bulma Garcia",
            searchQuery: "",
            departments: [
                { id: 1, name: "Human Resources", active: true },
                { id: 2, name: "Canteen", active: true },
                { id: 3, name: "Technology", active: true },
                { id: 4, name: "Finance", active: true },
                { id: 5, name: "Marketing", active: false },
                { id: 6, name: "Sales", active: false },
            ],
        };
    },
    computed: {
        filteredDepartments() {
            return this.departments.filter(
                (dept) =>
                    dept.active &&
                    dept.name.toLowerCase().includes(this.searchQuery.toLowerCase())
            );
        },
        inactiveDepartments() {
            return this.departments.filter((dept) => !dept.active);
        },
    },
    methods: {
    goToAddDepartment() {
        this.$router.push("/department/add");
    },
    handleDepartmentClick(department) {
        this.$router.push(`/department/${department.id}`);
    },
    logout() {
        console.log("You have been logged out!");
        this.$router.push("/login");
    },
},
};
</script>

<style scoped>


.departments-container {
    max-width: 500px;
    margin: 100px auto 0 auto;
    padding: 20px;
    position: relative;
    top: 50%;
    transform: translateY(-10%) scale(1.4);
}

.departments-card {
    background: rgb(244, 244, 244);
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.department-buttons {
    display: flex;
    flex-direction: column;
    gap: 10px;
    max-height: 300px;
    overflow-y: auto;
    padding: 10px;
    background: #fff;
    border: 1px solid #ddd;
}

.department-btn {
    width: 100%;
    padding: 12px 20px;
    background-color: white;
    border: 1px solid #ddd;
    border-radius: 6px;
    cursor: pointer;
    font-size: 1rem;
    text-align: left;
    transition: all 0.3s ease;
}

.department-btn:hover {
    background-color: #f5f5f5;
    border-color: #999;
}

.button-container {
    display: flex;
    justify-content: center;
    margin-top: 20px;
}

.create-department-btn {
    width: 300px;
    padding: 10px;
    background-color: #000000;
    color: white;
    border: none;
    border-radius: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    font-size: 1rem;
    cursor: pointer;
}

.create-department-btn:hover {
    background-color: #a4a4a4;
}

@media (max-width: 768px) {
    .departments-container {
        padding: 10px;
    }

    .create-department-btn {
        width: 90%;
    }
}
</style>