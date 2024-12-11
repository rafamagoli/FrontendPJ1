<template>
  <!-- Navigation Links -->
  <div id="nav">
    <router-link to="/dashboard">Dashboard</router-link>
    <router-link to="/login">Login</router-link>
    <router-link to="/register" class="register-link">Register</router-link>
    <router-link to="/employees" class="employees-link">Employees</router-link>
    <router-link to="/addEmployee" class="addEmployee-link">Add Employee</router-link>

  </div>

  <!-- Main App Container -->
  <div id="app">
    <main>
      <!-- Dynamic Component Based on Routes -->
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
/* Global Reset to Remove Default Margins and Paddings */
html, body {
  margin: 0;
  padding: 0;
  box-sizing: border-box; /* Faz a sidebar não ir pra cima do main content */
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}
*, *::before, *::after {
  margin: 0;
  padding: 0;
  box-sizing: inherit; /* Inherits box-sizing for all elements */
}

</style>