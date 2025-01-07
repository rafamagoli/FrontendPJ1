<template> 
     <!-- Barra de cima cinza / Top Bar -->
      <header class="top-bar">
        <button class="menu-toggle" @click="toggleSidebar">☰</button>

        <div class="top-bar-content">
          <img src="/balance_pig.png" alt="Balance Icon" class="balance-icon" />
          <!--  Balance information -->
          <span class="balance">{{ balance }}</span>
          <!-- Logout button -->
          <button @click="logout" class="logout-button">Logout</button>
        </div>
      </header>
</template>
<style>
</style>
<script>

import UserService from "@/core/services/UserService";

let currentUser = UserService.getCurrentUser();

export default {
  data() {
    return {
      balance: currentUser.balance,
    };
  },
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
