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
      <span class="balance">{{ currentUser.balance }} €</span>
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
      currentUser: UserService.getCurrentUser(),
      balance: "Loading...",
      showBalanceBox: false,
      newBalance: "",
      nif: null,
    };
  },
  async mounted() {
    try {
      this.decodeUserDetailsFromToken();
    } catch (error) {
      console.error("Error during initialization:", error);
      this.balance = "Error loading balance";
    }
  },
  methods: {
    decodeUserDetailsFromToken() {
      const token = localStorage.getItem("authToken");
      if (token) {
        try {
          const payload = JSON.parse(atob(token.split(".")[1]));
          this.nif = payload.nif;
          this.balance = this.currentUser.balance;
          console.log("Decoded NIF:", this.nif);
          console.log("Decoded Balance:", this.balance);
        } catch (error) {
          console.error("Error decoding token:", error);
          alert("Failed to decode user information. Please log in again.");
          this.$router.push("/user/login");
        }
      } else {
        console.error("Token not found");
        alert("Authentication required. Please log in.");
        this.$router.push("/user/login");
      }
    },
    async updateBalance() {
      if (this.newBalance === "" || isNaN(this.newBalance) || this.newBalance < 0) {
        alert("Please enter a valid balance.");
        return;
      }

      try {
        const response = await UserService.updateBalanceByNIF(this.nif, {
          newBalance: Number(this.newBalance),
        });

        this.balance = response.data.newBalance;
        alert(response.data.message || "Balance updated successfully!");
        this.showBalanceBox = false;
        await UserService.updateCurrentUserInformation()
        location.reload();
      } catch (error) {
        console.error("Error updating balance:", error);
        alert(error.response?.data?.message || "An error occurred while updating the balance.");
      }
    },
    toggleSidebar() {
      const sidebar = document.querySelector(".sidebar");
      sidebar.classList.toggle("open");
    },
    logout() {
      try {
        UserService.logout();
        this.$router.push("/user/login");
      } catch (error) {
        console.error("Error during logout:", error);
        alert("An error occurred while logging out.");
      }
    },
    toggleBalanceBox() {
      this.showBalanceBox = !this.showBalanceBox;
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
