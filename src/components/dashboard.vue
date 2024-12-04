<template>
  <!-- BARRA DE CIMA -->
  <div class="top-bar d-flex align-items-center">
    <div class="balance-info">
      <img src="/balance_pig.png" alt="Balance Icon" class="balance-icon" />
      <span>€145,00</span>
    </div>
    <button class="btn logout-btn">Logout</button>
  </div>

  <div class="container-fluid vh-100">
    <div class="row h-100">
      <!-- BARRA LATERAL/SIDEBAR -->
      <nav class="sidebar col-3">
        <div class="text-center mb-3">
          <img src="/abr_logo.png" alt="Logo" class="sidebar-logo" />
        </div>

        <h3 class="text-center text-white mb-4">{{ userName }}</h3>

        <ul class="nav flex-column">
          <p></p>
          
          <div class="section-sidebar">HUMAN RESOURCES</div>
          
          <li class="nav-item">
            <a class="nav-link" href="#dashboard">Dashboard</a>
          </li>

          <li class="nav-item" @click="toggleMenu">
            <a class="nav-link">Employees <span class="arrow">▼</span></a>
            <ul class="submenu">
              <li><a class="nav-link" href="#add-employee">Add Employee</a></li>
              <li><a class="nav-link" href="#view-employees">View Employees</a></li>
            </ul>
          </li>

          <li class="nav-item" @click="toggleMenu">
            <a class="nav-link">Tasks <span class="arrow">▼</span></a>
            <ul class="submenu">
              <li><a class="nav-link" href="#add-task">Create Tasks</a></li>
              <li><a class="nav-link" href="#view-task">View Tasks</a></li>
            </ul>
          </li>

          <li class="nav-item" @click="toggleMenu">
            <a class="nav-link">Departments <span class="arrow">▼</span></a>
            <ul class="submenu">
              <li><a class="nav-link" href="#add-department">Create Department</a></li>
              <li><a class="nav-link" href="#view-department">View Department</a></li>
            </ul>
          </li>

          <div class="section-sidebar">CANTEEN</div>

          <li class="nav-item" @click="toggleMenu">
            <a class="nav-link">Plates <span class="arrow">▼</span></a>
            <ul class="submenu">
              <li><a class="nav-link" href="#add-plate">Create Plate</a></li>
              <li><a class="nav-link" href="#view-plate">View Plates</a></li>
            </ul>
          </li>

          <li class="nav-item" @click="toggleMenu">
            <a class="nav-link">Reservations <span class="arrow">▼</span></a>
            <ul class="submenu">
              <li><a class="nav-link" href="#add-reservation">Create Reservation</a></li>
              <li><a class="nav-link" href="#view-reservation">View Reservations</a></li>
            </ul>
          </li>
        </ul>
      </nav>

      <!-- Conteúdo principal -->
      <main class="col-9 main-content">
        <section id="dashboard" class="py-4">
          <h2>Dashboard</h2>
          <div class="row g-3">
            <div class="col-md-4">
              <div class="card card-section">
                <h3>Tasks</h3>
                <ul>
                  <li>Human Resource</li>
                  <li>Canteen</li>
                  <li>Technology</li>
                  <li>Finance</li>
                </ul>
              </div>
            </div>

            <div class="col-md-4">
              <div class="card card-section">
                <h3>Employees</h3>
                <p>Manage Employees: create, view all, and update.</p>
              </div>
            </div>

            <div class="col-md-4">
              <div class="card card-section">
                <div class="card-reserv">Reservations</div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userName: "Bulma Garcia",
    };
  },

  methods: {
    toggleMenu(event) {
      const parentItem = event.target.closest(".nav-item");

      if (parentItem) {
        parentItem.classList.toggle("active");

        const submenu = parentItem.querySelector(".submenu");
        if (submenu) {
          submenu.style.display = submenu.style.display === "block" ? "none" : "block";
        }
      }
    },
  },
};
</script>

<style>
/* Global Styles */
html,
body {
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  background-color: #f8f9fa;
  margin: 0;
  padding: 0;
}

.top-bar {
  position: fixed;
  top: 0;
  left: 25%;
  width: 75%;
  height: 50px;
  background-color: #d1d1d1;
  border-bottom: 1px solid #ddd;
  padding: 0 20px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.balance-icon {
  width: 22px;
  height: 22px;
  margin-right: 5px;
  vertical-align: middle;
}

.balance-info {
  margin-right: 10px;
  font-size: 12px;
  color: #000;
}

.logout-btn {
  font-size: 12px;
  padding: 4px 10px;
  background-color: #000;
  border: none;
}

.sidebar {
  position: sticky;
  top: 0;
  height: 100vh;
  width: 25%;
  background-color: #000;
  padding: 20px;
  color: #fff;
}

.sidebar-logo {
  max-width: 100%;
  height: auto;
  display: block;
  margin: 0 auto;
  max-height: 150px;
  object-fit: contain;
  margin-bottom: 20px;
}

.nav-link {
  display: block;
  padding: 10px 15px;
  background-color: #fff;
  color: #000;
  margin-bottom: 15px; /* distância entre */
  text-decoration: none;
}

.nav-item .submenu {
  display: none;
  padding-left: 10px;
}

.nav-item.active .submenu {
  display: block;
}

.nav-item .arrow {
  float: right;
  transition: transform 0.3s;
}

.nav-item.active .arrow {
  transform: rotate(90deg);
}

.section-sidebar {
  font-size: 0.875rem;
  margin: 10px 0;
}

.main-content {
  width: 75%;
  margin-left: 25%;
  padding: 20px;
}

.card-section {
  background-color: #fff;
  border: 1px solid #dee2e6;
  border-radius: 5px;
  padding: 20px;
  text-align: center;
  transition: transform 0.3s ease;
}

.card-section:hover {
  transform: scale(1.05);
}

.card-section h3 {
  font-size: 1.5rem;
  margin-bottom: 10px;
}

.card-reserv {
  background-color: #fff;
  border: 1px solid #dee2e6;
  border-radius: 5px;
  padding: 15px;
  text-align: center;
  transition: transform 0.3s ease;
}
</style>