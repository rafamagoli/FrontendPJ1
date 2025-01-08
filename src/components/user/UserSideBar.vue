<template>
  <aside class="sidebar">
    <img src="/abr_logo.png" alt="Logo" class="sidebar-logo" />
    <h3 id="username" class="text-center text-white mb-4">{{ currentUser.username }}</h3>

    <nav>
      <ul>
        <!-- Dashboard menu -->
        <li class="nav-item">
          <button class="nav-link" @click="navigateTo('user-dashboard')">Dashboard</button>
        </li>

        <!-- Sidebar HUMAN RESOURCES Section -->
        <div class="section-sidebar">
          HUMAN RESOURCES
          <!-- Tasks menu with submenus -->
          <li class="nav-item">
            <button class="nav-link" @click="toggleSubmenu('tasks')">
              Tasks <span class="arrow">▼</span>
            </button>
            <ul class="submenu" :class="{ active: activeMenu === 'tasks' }">
              <li>
                <button class="nav-link" @click="navigateTo('task-add')">Create Tasks</button>
              </li>
              <li>
                <button class="nav-link" @click="navigateTo('task-list')">View Tasks</button>
              </li>
            </ul>
          </li>

          <!-- Departments menu -->
          <li class="nav-item">
            <button class="nav-link" @click="toggleSubmenu('departments')">
              Departments <span class="arrow">▼</span>
            </button>
            <ul class="submenu" :class="{ active: activeMenu === 'departments' }">
              <li>
                <button class="nav-link" @click="navigateTo('department-add')">Create Department</button>
              </li>
              <li>
                <button class="nav-link" @click="navigateTo('department-list')">View Department</button>
              </li>
            </ul>
          </li>

          <!-- Employees menu -->
          <li class="nav-item">
            <button class="nav-link" @click="toggleSubmenu('employees')">
              Employees <span class="arrow">▼</span>
            </button>
            <ul class="submenu" :class="{ active: activeMenu === 'employees' }">
              <li>
                <button class="nav-link" @click="navigateTo('employee-add')">Add Employee</button>
              </li>
              <li>
                <button class="nav-link" @click="navigateTo('employee-list')">View Employees</button>
              </li>
            </ul>
          </li>
        </div>

        <div class="section-sidebar">
          CANTEEN
          <!-- Ingredients menu -->
          <li class="nav-item" v-if="currentUser.isCanteenManager">
            <button class="nav-link" @click="toggleSubmenu('ingredients')">
              Ingredients <span class="arrow">▼</span>
            </button>
            <ul class="submenu" :class="{ active: activeMenu === 'ingredients' }">
              <li>
                <button class="nav-link" @click="navigateTo('ingredient-add')">Create Ingredient</button>
              </li>
              <li>
                <button class="nav-link" @click="navigateTo('ingredient-list')">View Ingredients</button>
              </li>
            </ul>
          </li>

          <!-- Plates menu -->
          <li class="nav-item">
            <button class="nav-link" @click="toggleSubmenu('plates')">
              Plates <span class="arrow">▼</span>
            </button>
            <ul class="submenu" :class="{ active: activeMenu === 'plates' }">
              <li v-if="currentUser.isCanteenManager">
                <button class="nav-link" @click="navigateTo('plate-add')">Create Plate</button>
              </li>
              <li>
                <button class="nav-link" @click="navigateTo('plate-list')">View Plates</button>
              </li>
            </ul>
          </li>

          <!-- Reservation menu -->
          <li class="nav-item">
            <button class="nav-link" @click="toggleSubmenu('reservation')">
              Reservation <span class="arrow">▼</span>
            </button>
            <ul class="submenu" :class="{ active: activeMenu === 'reservation' }">
              <li>
                <button class="nav-link" @click="navigateTo('reservation-add')">Create Reservation</button>
              </li>
              <li>
                <button class="nav-link" @click="navigateTo('reservation-list')">View Reservation</button>
              </li>
            </ul>
          </li>
        </div>
      </ul>
    </nav>
  </aside>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import UserService from "@/core/services/UserService";

const router = useRouter();
const activeMenu = ref(null);

let currentUser = UserService.getCurrentUser();

function toggleSubmenu(menu) {
  activeMenu.value = activeMenu.value === menu ? null : menu;
}

function navigateTo(routeName) {
  router.push({ name: routeName });
}
</script>

<style>
.sidebar-logo {
  display: block;
  margin: 0 auto;
  max-width: 100px;
}

.text-center {
  text-align: center;
}

.text-white {
  color: white;
}

.mb-4 {
  margin-bottom: 1rem;
}

.nav-item {
  margin-bottom: 1rem;
}

/* Button styling inside nav-item */
.nav-link {
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  border: 1px solid #ddd;
  background-color: white;
  color: #2c3e50;
  text-align: left;
  padding: 0.75rem;
  width: 100%;
  border-radius: 2px;
  transition: background-color 0.3s, color 0.3s;
}

.nav-link:hover {
  background-color: #f0f0f0;
  color: #34495e;
}

/* Styling for submenus */
.submenu {
  display: none;
  margin-top: 0.5rem;
  margin-bottom: 2px;
}


.submenu.active {
  display: block;
}

/* Submenu items styled like buttons but slightly indented */
.submenu .nav-link {
  padding: 0.5rem;
  background-color: #f9f9f9;
  color: #000000;
}

.submenu .nav-link:hover {
  background-color: #e9e9e9;
}

/* Section title styling */
.section-sidebar {
  margin-top: 1.5rem;
  font-weight: bold;
  color: #bdc3c7;
}

/* Arrow icon alignment */
.arrow {
  margin-left: auto;
}
</style>