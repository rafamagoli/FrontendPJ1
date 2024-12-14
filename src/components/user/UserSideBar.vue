<template>
  <aside class="sidebar">
    <img src="/abr_logo.png" alt="Logo" class="sidebar-logo" />
    <h3 id="username" class="text-center text-white mb-4">{{ userName }}</h3>

    <nav>
      <ul>
        <!-- Dashboard menu com submenus -->
        <li class="nav-item">
          <router-link class="nav-link dashboard-link">Dashboard</router-link>
        </li>

        <!-- Sidebar HUMAN RESOURCES Section -->
        <div class="section-sidebar">
          HUMAN RESOURCES
          <!-- Tasks menu com submenus -->
          <li class="nav-item" @click="toggleMenu">
            <router-link class="nav-link">Tasks <span class="arrow">▼</span></router-link>
            <ul class="submenu">
              <li>
                <router-link activeClass="active" class="nav-link">Create Tasks</router-link>
              </li>
              <li>
                <router-link activeClass="active" class="nav-link">View Tasks</router-link>
              </li>
            </ul>
          </li>

          <!-- Departments menu com submenus -->
          <li class="nav-item" @click="toggleMenu">
            <router-link class="nav-link">Departments <span class="arrow">▼</span></router-link>
            <ul class="submenu">
              <li>
                <router-link class="nav-link">Create Department</router-link>
              </li>
              <li>
                <router-link class="nav-link">View Department</router-link>
              </li>
            </ul>
          </li>
          <!-- Employees menu com submenus -->
          <li class="nav-item" @click="toggleMenu">
            <router-link class="nav-link">Employees <span class="arrow">▼</span></router-link>
            <ul class="submenu">
              <li>
                <router-link class="nav-link" :to="{ name: 'employee-add' }">Add Employee</router-link>
              </li>
              <li>
                <router-link class="nav-link" :to="{ name: 'employee-list' }">View Employees</router-link>
              </li>
            </ul>
          </li>
        </div>
        <!-- Fim div Ruman Resources-->

        <p></p>

        <div class="section-sidebar">
          CANTEEN
          <!-- Plates menu com submenus -->
          <li class="nav-item" @click="toggleMenu">
            <router-link class="nav-link">Plates <span class="arrow">▼</span></router-link>
            <ul class="submenu">
              <li>
                <router-link class="nav-link">Create Plate</router-link>
              </li>
              <li>
                <router-link class="nav-link">View Plates</router-link>
              </li>
            </ul>
          </li>

          <!-- Reservations menu com submenus -->
          <li class="nav-item" @click="toggleMenu">
            <router-link class="nav-link">Reservations <span class="arrow">▼</span></router-link>
            <ul class="submenu">
              <li>
                <router-link class="nav-link">Create Reservation</router-link>
              </li>
              <li>
                <router-link class="nav-link">View Reservations</router-link>
              </li>
            </ul>
          </li>
        </div>
      </ul>
    </nav>
  </aside>

</template>

<style>
.nav-link :has(.submenu) :after {
  content: "▼"
}
</style>

<script setup>

function toggleMenu(event) {
  const parentItem = event.target.closest(".nav-item");
  if (parentItem) {
    parentItem.classList.toggle("active");

    const submenu = parentItem.querySelector(".submenu");
    if (submenu) {
      submenu.style.display =
        submenu.style.display === "block" ? "none" : "block";
    }
  }
}

</script>
