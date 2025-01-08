<template>
  <header class="top-bar">
    <button class="menu-toggle" @click="toggleSidebar">☰</button>

    <div class="top-bar-content">
      <!-- Piggy Icon Container -->
      <div class="balance-icon-container">
        <img
          src="/balance_pig.png"
          alt="Balance Icon"
          class="balance-icon"
          @click.stop="toggleBalanceBox"
        />
        <!-- Popup for Balance -->
        <div
          v-if="showBalanceBox"
          class="balance-popup"
          @click.stop
        >
          <h3 class="popup-title">Insert New Balance:</h3>
          <input
            v-model="newBalance"
            type="number"
            placeholder="Enter new balance"
            class="input-field"
          />
          <div class="popup-buttons">
            <button @click="updateBalance" class="btn btn-confirm">Confirm</button>
            <button @click="showBalanceBox = false" class="btn btn-cancel">Cancel</button>
          </div>
        </div>
      </div>
      <!-- Balance Information -->
      <span class="balance">{{ balance }} €</span>
      <!-- Logout Button -->
      <button @click="logout" class="logout-button">Logout</button>
    </div>
  </header>
</template>

<script>
import UserService from "@/core/services/UserService";

export default {
  data() {
    return {
      balance: UserService.getCurrentUser()?.balance || 0,
      showBalanceBox: false,
      newBalance: "",
    };
  },
  methods: {
    toggleBalanceBox() {
      this.showBalanceBox = !this.showBalanceBox;
    },
    async updateBalance() {
      if (this.newBalance === "" || isNaN(this.newBalance) || this.newBalance < 0) {
        alert("Please enter a valid balance.");
        return;
      }

      try {
        const nif = UserService.getCurrentUser()?.nif;
        const response = await UserService.updateBalanceByNIF(nif, { newBalance: Number(this.newBalance) });

        this.balance = response.data.newBalance;
        alert(response.data.message || "Balance updated successfully!");
        this.showBalanceBox = false;
      } catch (error) {
        console.error("Error updating balance:", error);
        alert(error.response?.data?.message || "An error occurred while updating the balance.");
      }
    },
    logout() {
      try {
        UserService.logout();
        localStorage.removeItem("authToken");
        localStorage.removeItem("currentUser");
        localStorage.removeItem("username");
        this.$router.push("/user/login");
      } catch (error) {
        console.error("Error during logout:", error);
        alert("An error occurred while logging out.");
      }
    },
    toggleSidebar() {
      const sidebar = document.querySelector(".sidebar");
      sidebar.classList.toggle("open");
    },
  },
};
</script>

<style scoped>
.top-bar-content {
  display: flex;
  align-items: center;
  justify-content: space-between; 
  position: relative;
}

.balance-icon-container {
  position: relative;
  cursor: pointer;
}

.balance-popup {
  position: absolute;
  top: 40px;
  left: 50%; 
  transform: translateX(-50%);
  background: white;
  padding: 15px; 
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2); 
  z-index: 10; 
  width: 250px; 
}

.popup-title {
  text-align: center;
  margin-bottom: 10px;
  font-size: 18px;
  font-weight: bold;
}

.input-field {
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.popup-buttons {
  display: flex;
  justify-content: space-between;
}

.btn {
  padding: 10px 15px;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn-confirm {
  background-color: #000;
  color: white;
}

.btn-cancel {
  background-color: #000;
  color: white;
}

.btn:hover {
  opacity: 0.9;
}

.balance-icon {
  width: 30px;
  height: 30px;
  cursor: pointer;
}
</style>
