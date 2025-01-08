<template>
  <div class="main-content">
    <h1 id="page-title">Edit Reservation</h1>

    <div class="edit-form">
      <form @submit.prevent="handleSubmit">
        <!-- Dish Dropdown -->
        <div class="form-group">
          <label for="dish">Dish</label>
          <select id="dish" v-model="reservation.dish" required>
            <option value="">Select a dish</option>
            <option v-for="plate in availablePlates" :key="plate.id" :value="plate.name">
              {{ plate.name }} - ${{ plate.price }}
            </option>
          </select>
        </div>

        <!-- Date Picker Input -->
        <div class="form-group">
          <label for="date">Date</label>
          <input
            type="date"
            id="date"
            v-model="reservation.date"
            required
          />
        </div>

        <!-- Action Buttons -->
        <div class="button-group">
          <button type="button" @click="cancel" class="cancel-button">
            Cancel
          </button>
          <button type="button" @click="handleDelete" class="delete-button">
            Delete
          </button>
          <button type="submit" class="edit-button">
            Update Reservation
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import ReservationService from "@/core/services/ReservationService";
import PlateService from "@/core/services/PlateService";

export default {
  data() {
    return {
      reservation: {
        date: "",  // Reservation date (editable now)
        dish: "",  // Dish name (editable)
      },
      availablePlates: [],  // Plates available to select from
      error: null,  // Error message (if any)
    };
  },
  async created() {
    const reservationId = this.$route.params.id; // Get the reservation ID from the route params

    if (reservationId) {
      await this.fetchReservation(reservationId); // Fetch the reservation details
    } else {
      console.error("No reservation ID found. Redirecting...");
      this.$router.push("/reservation/list");
    }

    await this.fetchAvailablePlates(); // Fetch available plates for the dropdown
  },
  methods: {
    // Fetch reservation details using the reservation ID
    async fetchReservation(reservationId) {
      try {
        const response = await ReservationService.getReservationById(reservationId);
        this.reservation = {
          date: new Date(response.data.data.reservation.date).toISOString().split('T')[0], // Date format YYYY-MM-DD
          dish: response.data.data.reservation.plate,  // Set the selected dish
        };
      } catch (error) {
        console.error("Failed to fetch reservation details:", error.response?.data || error.message);
        this.error = "Failed to fetch reservation details.";
        this.$router.push("/reservation/list");
      }
    },

    // Fetch all available plates for the dish dropdown
    async fetchAvailablePlates() {
      try {
        const response = await PlateService.getAllPlates();
        this.availablePlates = response.data.data.plates.map((plate) => ({
          id: plate._id,
          name: plate.name,
          price: plate.price,
        }));
      } catch (error) {
        console.error("Failed to fetch plates:", error.response?.data || error.message);
        this.error = "Failed to fetch plates.";
      }
    },

    // Update the reservation with the new dish and date
    async handleSubmit() {
      try {
        if (!this.reservation.dish || !this.reservation.date) {
          alert("Dish and date are required!");
          return;
        }

        const updatedReservation = {
          plateName: this.reservation.dish, // Only updating the dish (plateName)
          date: this.reservation.date,      // Sending date in the correct format (YYYY-MM-DD)
        };

        await ReservationService.updateReservation(this.$route.params.id, updatedReservation);
        alert("Reservation updated successfully!");
        this.$router.push("/reservation/list");
      } catch (error) {
        console.error("Failed to update reservation:", error.response?.data || error.message);
        alert("Failed to update reservation. Please try again.");
      }
    },

    // Delete the reservation
    async handleDelete() {
      if (confirm("Are you sure you want to delete this reservation?")) {
        try {
          await ReservationService.deleteReservation(this.$route.params.id);
          alert("Reservation deleted successfully!");
          this.$router.push("/reservation/list");
        } catch (error) {
          console.error("Error deleting reservation:", error.response?.data || error.message);
          alert("Failed to delete reservation. Please try again.");
        }
      }
    },

    // Cancel and navigate back to the reservation list
    cancel() {
      this.$router.push("/reservation/list");
    },
  },
};
</script>

<style scoped>
.edit-form {
  max-width: 500px;
  margin: 20px auto;
  padding: 20px;
  background: #f6f5f5;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.form-group select,
.form-group input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.button-group {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.cancel-button,
.delete-button,
.edit-button {
  width: 32%;  /* Adjusted width to make buttons aligned */
  padding: 10px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  color: white;
  font-size: 1rem;
}

.cancel-button {
  background: #f44336;
}

.delete-button {
  background: #000;
}

.edit-button {
  background: #4CAF50;
}

.cancel-button:hover,
.delete-button:hover,
.edit-button:hover {
  background: #333;
}

@media (max-width: 768px) {
  .edit-form {
    margin: 10px;
    padding: 15px;
  }

  .button-group {
    flex-direction: column;
    gap: 10px;
  }

  .cancel-button,
  .delete-button,
  .edit-button {
    width: 100%;
  }
}
</style>
