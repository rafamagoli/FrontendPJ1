<template>
  <div id="addEmployee-page">
    <!-- Sidebar/ Barra preta lateral-->
    <aside class="sidebar">
      <img src="/abr_logo.png" alt="Logo" class="sidebar-logo" />
      <h3 id="username" class="text-center text-white mb-4">{{ userName }}</h3>

      <nav>
        <ul>
          <!-- Dashboard menu com submenus -->
          <li class="nav-item">
            <a class="nav-link dashboard-link" href="#dashboard">Dashboard</a>
          </li>

          <!-- Sidebar HUMAN RESOURCES Section -->
          <div class="section-sidebar">
            HUMAN RESOURCES
            <!-- Tasks menu com submenus -->
            <li class="nav-item" @click="toggleMenu">
              <a class="nav-link">Tasks <span class="arrow">▼</span></a>
              <ul class="submenu">
                <li><a class="nav-link" href="#add-task">Create Tasks</a></li>
                <li><a class="nav-link" href="#view-task">View Tasks</a></li>
              </ul>
            </li>

            <!-- Departments menu com submenus -->
            <li class="nav-item" @click="toggleMenu">
              <a class="nav-link">Departments <span class="arrow">▼</span></a>
              <ul class="submenu">
                <li>
                  <a class="nav-link" href="#add-department"
                    >Create Department</a
                  >
                </li>
                <li>
                  <a class="nav-link" href="#view-department"
                    >View Department</a
                  >
                </li>
              </ul>
            </li>
            <!-- Employees menu com submenus -->
            <li class="nav-item" @click="toggleMenu">
              <a class="nav-link" >Employees <span class="arrow">▼</span></a>
              <ul class="submenu">
                <li>
                  <a class="nav-link" href="#add-employee">Add Employee</a>
                </li>
                <li>
                  <a class="nav-link" href="#view-employees">View Employees</a>
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
              <a class="nav-link">Plates <span class="arrow">▼</span></a>
              <ul class="submenu">
                <li><a class="nav-link" href="#add-plate">Create Plate</a></li>
                <li><a class="nav-link" href="#view-plate">View Plates</a></li>
              </ul>
            </li>

            <!-- Reservations menu com submenus -->
            <li class="nav-item" @click="toggleMenu">
              <a class="nav-link">Reservations <span class="arrow">▼</span></a>
              <ul class="submenu">
                <li>
                  <a class="nav-link" href="#add-reservation"
                    >Create Reservation</a
                  >
                </li>
                <li>
                  <a class="nav-link" href="#view-reservation"
                    >View Reservations</a
                  >
                </li>
              </ul>
            </li>
          </div>
        </ul>
      </nav>
    </aside>

    <div class="main-content">
      <!-- Barra de cima cinza / Top Bar -->
      <header class="top-bar">
        <button class="menu-toggle" @click="toggleSidebar">☰</button>

        <div class="top-bar-content">
          <img src="/balance_pig.png" alt="Balance Icon" class="balance-icon" />
          <!--  Balance information -->
          <span class="balance">$500</span>
          <!-- Logout button -->
          <button @click="logout" class="logout-button">Logout</button>
        </div>
      </header>
      <!-- ATENÇÃO: tudo o que está acima desse comment pode ser padronizado -->

      <!-- ATENÇÃO: ALTERE AQUI -> Conteúdo principal (parte branca) -->
      <!-- ATENÇÃO: ALTERE AQUI -> Conteúdo principal (parte branca) -->
      <!-- ATENÇÃO: ALTERE AQUI -> Conteúdo principal (parte branca) -->
      <!-- ATENÇÃO: ALTERE AQUI -> Conteúdo principal (parte branca) -->
      <!-- ATENÇÃO: ALTERE AQUI -> Conteúdo principal (parte branca) -->

      <!-- Cards Section -->
      <p></p>
      <h1 id="page-title">Add Employee</h1>
      <!-- Add Employee Form -->
      <section class="add-employee-form">
        <h2>Add New Employee</h2>
        <form @submit.prevent="handleSubmit">
          <!-- Name -->
          <div class="form-group">
            <label for="name">Name</label>
            <input type="text" id="name" v-model="employee.name" required />
          </div>

          <!-- Department -->
          <div class="form-group">
            <label for="department">Department</label>
            <input
              type="text"
              id="department"
              v-model="employee.department"
              required
            />
          </div>

          <!-- Username -->
          <div class="form-group">
            <label for="username">Username</label>
            <input
              type="text"
              id="username"
              v-model="employee.username"
              required
            />
          </div>

          <!-- Balance -->
          <div class="form-group">
            <label for="balance">Balance</label>
            <input
              type="text"
              id="balance"
              v-model="employee.balance"
              disabled
            />
          </div>

          <!-- Password -->
          <div class="form-group">
            <label for="password">Password</label>
            <input
              type="password"
              id="password"
              v-model="employee.password"
              required
            />
          </div>

          <!-- Confirm Password -->
          <div class="form-group">
            <label for="confirm-password">Confirm Password</label>
            <input
              type="password"
              id="confirm-password"
              v-model="employee.confirmPassword"
              required
            />
          </div>

          <!-- NIF -->
          <div class="form-group">
            <label for="nif">NIF</label>
            <input type="text" id="nif" v-model="employee.nif" required />
          </div>

          <!-- Role -->
          <div class="form-group">
            <label for="role">Role</label>
            <select id="role" v-model="employee.role" required>
              <option value="" disabled>Select a role</option>
              <option value="Employee">Employee</option>
              <option value="HR Manager">HR Manager</option>
              <option value="Canteen Manager">Canteen Manager</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          <!-- Action Buttons -->
          <div class="form-actions">
            <button type="button" class="cancel-button" @click="cancel">
              Cancel
            </button>
            <button type="submit" class="create-button">Create</button>
          </div>
        </form>
      </section>
    </div>
  </div>
</template>

<script>
/* PADRÃO DA ESTRUTURA DA PÁGINA */

export default {
  data() {
    return {
      //Username
      /* PADRÃO DA ESTRUTURA DA PÁGINA */
      /* PADRÃO DA ESTRUTURA DA PÁGINA ABAIXO */
      userName: "Bulma Garcia",
      /* PADRÃO DA ESTRUTURA DA PÁGINA ACIMA */

      employee: {
        name: "",
        department: "",
        username: "",
        balance: "0,00",
        password: "",
        confirmPassword: "",
        nif: "",
        role: "",
      },
    };
  },

  methods: {
    handleSubmit() {
      if (this.employee.password !== this.employee.confirmPassword) {
        alert("Passwords do not match!");
        return;
      }
      console.log("Employee created:", this.employee);
      this.$router.push("/employees"); // Redirect to employees page
    },
    cancel() {
      this.$router.push("/employees");
    },




    // Logout Método
    /* PADRÃO DA ESTRUTURA DA PÁGINA INICIO */
    addEmployee() {
      this.$router.push("/addEmployee");
    },
    logout() {
      console.log("You have been logged out!"); // fazer funcionar

      // Redirect to login page
      this.$router.push("/login");
    },
    toggleMenu(event) {
      const parentItem = event.target.closest(".nav-item");
      if (parentItem) {
        parentItem.classList.toggle("active");

        const submenu = parentItem.querySelector(".submenu");
        if (submenu) {
          submenu.style.display =
            submenu.style.display === "block" ? "none" : "block";
        }
      }
    },

    toggleSidebar() {
      const sidebar = document.querySelector(".sidebar");
      sidebar.classList.toggle("open");
    },
    /* PADRÃO DA ESTRUTURA DA PÁGINA FIM */

  },
};
</script>

<style scoped>

/* Add Employee Form Styling */
.add-employee-form {
  max-width: 600px;
  margin: 20px auto;
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.add-employee-form h2 {
  margin-bottom: 20px;
  font-size: 1.5rem;
  text-align: center;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  font-size: 0.9rem;
}

.form-group input,
.form-group select {
  width: 100%;
  padding: 8px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

.form-group input:disabled {
  background: #f5f5f5;
}

.form-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.cancel-button,
.create-button {
  width: 48%;
  padding: 10px;
  font-size: 1rem;
  border: none;
  cursor: pointer;
  background: #000000;
  color: rgb(255, 255, 255);
}

.cancel-button:hover,
.create-button:hover {
  background: rgb(158, 158, 158);
}

/* Responsiveness */
@media (max-width: 768px) {
  .add-employee-form {
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

/* ANA E JOÃO */

/* ATENÇÃO: TUDO O QUE ESTÁ AQUI EMBAIXO É PADRÃO DA ESTRUTURA DA PÁGINA - ALTERE COM CUIDADO */
/* ATENÇÃO: TUDO O QUE ESTÁ AQUI EMBAIXO É PADRÃO DA ESTRUTURA DA PÁGINA - ALTERE COM CUIDADO */
/* ATENÇÃO: TUDO O QUE ESTÁ AQUI EMBAIXO É PADRÃO DA ESTRUTURA DA PÁGINA - ALTERE COM CUIDADO */
/* ATENÇÃO: TUDO O QUE ESTÁ AQUI EMBAIXO É PADRÃO DA ESTRUTURA DA PÁGINA - ALTERE COM CUIDADO */
/* ATENÇÃO: TUDO O QUE ESTÁ AQUI EMBAIXO É PADRÃO DA ESTRUTURA DA PÁGINA - ALTERE COM CUIDADO */
/* ATENÇÃO: TUDO O QUE ESTÁ AQUI EMBAIXO É PADRÃO DA ESTRUTURA DA PÁGINA - ALTERE COM CUIDADO */
/* ATENÇÃO: TUDO O QUE ESTÁ AQUI EMBAIXO É PADRÃO DA ESTRUTURA DA PÁGINA - ALTERE COM CUIDADO */
/* ATENÇÃO: TUDO O QUE ESTÁ AQUI EMBAIXO É PADRÃO DA ESTRUTURA DA PÁGINA - ALTERE COM CUIDADO */
/* ATENÇÃO: TUDO O QUE ESTÁ AQUI EMBAIXO É PADRÃO DA ESTRUTURA DA PÁGINA - ALTERE COM CUIDADO */
#page-title {
  padding-top: 15px;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}
h3#username {
  font-size: 1.5rem;
  padding-bottom: 20px;
  text-align: center;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}

.dashboard-link {
  display: block;
  padding: 10px 15px;
  font-size: 1.5rem;
  background-color: #fff;
  color: #000;
  margin-bottom: 15px;
  text-decoration: none;
  font-size: 0.875rem; /* Aqui você pode ajustar o tamanho da fonte para ser igual ao dos outros itens de menu */
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}

.nav-link {
  display: block;
  padding: 10px 15px;
  background-color: #fff;
  color: #000;
  margin-bottom: 15px;
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
  color: rgb(169, 169, 169);
  margin: 10px 0;
}

/* Sidebar geral */
.sidebar {
  width: 250px;
  background-color: black;
  color: white;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  overflow-y: auto;
  transition: transform 0.3s ease-in-out; /* Transição suave */
  padding: 20px;
  z-index: 1000; /* Mantém a sidebar sobre o conteúdo */
}

.sidebar.open {
  transform: translateX(0); /* Sidebar aparece */
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

/* Sidebar list styling */
.sidebar ul {
  list-style: none; /* Remove bullets */
  padding: 0; /* No padding */
}

.sidebar ul li {
  margin: 10px 0; /* Space between menu items */
}

.sidebar ul li span {
  font-weight: bold; /* Highlight main menu items */
}

.sidebar ul li ul {
  margin-left: 20px; /* Indent submenus */
}

/* Main content styles */
.main-content {
  margin-left: 250px; /* Leave space for the sidebar */
  padding: 20px; /* Inner padding */
}

/* Top bar styles */
.top-bar {
  background-color: lightgrey; /* Light grey background */
  padding: 10px 20px; /* Padding around content */
  display: flex; /* Align items horizontally */
  justify-content: flex-end; /* Push items to the right */
  align-items: center; /* Center items vertically */
  box-sizing: border-box; /* Prevent padding from increasing size */
  position: relative; /* Ensure proper stacking */
}

.top-bar-content {
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  display: flex; /* Align logout and balance together */
  align-items: center; /* Vertically align */
}

.balance {
  margin-right: 20px; /* Space between balance and logout button */
  font-size: small;
}

.balance-icon {
  width: 22px;
  height: 22px;
  margin-right: 5px;
  vertical-align: middle;
}

.logout-button {
  padding: 5px 10px; /* Button padding */
  background-color: rgb(0, 0, 0); /* Black background */
  color: white; /* White text */
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  border: none; /* Remove border */
  cursor: pointer; /* Show pointer cursor */
}
.logout-button:hover {
  background-color: #a4a4a4;
}

/* Cards grid layout */
.cards {
  display: grid; /* Use CSS grid */
  grid-template-columns: repeat(
    auto-fit,
    minmax(250px, 1fr)
  ); /* Ajusta automaticamente o número de colunas */
  gap: 20px; /* Space between cards */
  margin-top: 20px; /* Space above cards */
}

/* Card styles */
.card {
  background: rgb(244, 244, 244); /* White background */
  padding: 10px; /* Inner padding */
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); /* Subtle shadow */
  display: flex; /* Enable flexbox layout */
  flex-direction: column; /* Stack content vertically */
  min-height: 100px; /* Set a minimum height */
  transition: transform 0.3s, box-shadow 0.3s; /* Transição suave para hover */
}

/* Estilos para as subseções dentro das cards */
.sub-box {
  background-color: #fff; /* Fundo branco igual ao submenu */
  color: #000; /* Cor do texto */
  padding: 10px 15px; /* Espaçamento interno */
  margin-bottom: 10px; /* Espaço entre os boxes */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Sombra suave */
  cursor: pointer; /* Cursor do tipo ponteiro */
  font-size: 0.875rem; /* Tamanho do texto */
  transition: background-color 0.3s, box-shadow 0.3s; /* Animações suaves */
}

/* Efeito hover */
.sub-box:hover {
  background-color: #f0f0f0; /* Cor de fundo ao passar o mouse */
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.15); /* Sombra mais forte */
}

/* Card headings */
.tasks-card h2,
.employees-card h2,
.card h2 {
  margin-bottom: 10px; /* Space below heading */
}

.menu-toggle {
  align-content: flex-start;
  background-color: rgb(70, 70, 70);
  color: rgb(190, 190, 190);
  border: none;
  padding: 5px;
  font-size: 13px;
  cursor: pointer;
  position: relative;
  margin-right: 15px; /* Espaçamento entre o porquinho e o botão */
  z-index: 1100; /* Botão sempre sobre a sidebar */
}

/* ************************************** */

/* RESPONSIVIDADE */
@media (max-width: 1024px) {
  /* Sidebar mais estreita */
  .sidebar {
    width: 200px;
  }

  .main-content {
    margin-left: 200px; /* Ajusta o espaço do conteúdo */
  }
}
/* ************************************** */

@media (max-width: 768px) {
  /* Sidebar se esconde fora da tela */
  .sidebar {
    transform: translateX(-100%); /* Move a sidebar para fora da tela */
    position: absolute;
    z-index: 1000; /* Garante que a sidebar apareça sobre o conteúdo */
    width: 250px;
  }

  /* Sidebar visível quando tem a classe "open" */
  .sidebar.open {
    transform: translateX(0); /* Retorna a sidebar para dentro da tela */
  }

  /* Botão de menu */
  .menu-toggle {
    background-color: black;
    color: rgb(190, 190, 190);
    border: none;
    padding: 5px;
    font-size: 20px;
    cursor: pointer;
    position: relative;
    margin-right: 15px;
    z-index: 1100; /* Botão sempre sobre a sidebar */
  }

  .menu-toggle:hover {
    background-color: #333;
  }

  .main-content {
    margin-left: 0; /* Remove a margem */
  }

  .top-bar {
    justify-content: space-between; /* Ajusta alinhamento */
  }

  /* Cards ocupam uma única coluna */
  .cards {
    grid-template-columns: 1fr;
  }
}
/* ************************************** */

@media (max-width: 480px) {
  /* Reduz padding e fontes em telas pequenas */
  .main-content,
  .top-bar {
    padding: 10px;
  }

  .top-bar {
    flex-direction: column;
    align-items: flex-start;
  }

  .cards {
    gap: 10px; /* Menor espaço entre os cards */
  }

  .card {
    padding: 10px;
  }

  .sub-box {
    padding: 8px 10px; /* Reduz padding das sub-boxes */
    font-size: 0.8rem;
  }
}
/* ************************************** */
</style>
