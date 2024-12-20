<template> 
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
</template>
<style>
</style>
<script>
export default {
  methods: {
    logout() {
      console.log("You have been logged out!");
      this.$router.push("/user/login");
    },
    toggleSidebar() {
      const sidebar = document.querySelector(".sidebar");
      sidebar.classList.toggle("open");
    },
  },
};
</script>
