<template>
  <div id="edit-reservation-page" class="page-background">
    <div class="main-content">
      <section class="edit-reservation-form">
        <h2>Edit Reservation</h2>
        <form @submit.prevent="handleSubmit">
          <div class="form-group">
            <label for="date">Reservation Date</label>
            <input
              type="date"
              id="date"
              v-model="reservation.date"
              required
            />
          </div>

          <!-- Plate Dropdown -->
          <div class="form-group">
            <label for="plate">Select Plate</label>
            <select id="plate" v-model="reservation.plateName" required>
              <option value="" disabled>Select a plate</option>
              <option v-for="plate in availablePlates" :key="plate.name" :value="plate.name">
                {{ plate.name }}
              </option>
            </select>
          </div>

          <!-- Action Buttons -->
          <div class="form-actions">
            <button type="button" class="cancel-button" @click="cancel">
              Cancel
            </button>
            <button type="button" class="delete-button" @click="handleDelete">
              Delete
            </button>
            <button type="submit" class="edit-button">
              Update Reservation
            </button>
          </div>
        </form>
      </section>
    </div>
  </div>
</template>

<script>
import ReservationService from "@/core/services/ReservationService";
import PlateService from "@/core/services/PlateService";
import UserService from "@/core/services/UserService";

export default {
  data() {
    return {
      reservation: {
        date: "", 
        plateName: "", 
      },
      availablePlates: [],
      error: null, 
    };
  },
  async created() {
    const reservationId = this.$route.params.id; 

    if (reservationId) {
      await this.fetchReservation(reservationId);
    } else {
      console.error("No reservation ID found. Redirecting...");
      this.$router.push("/reservation/list");
    }

    await this.fetchAvailablePlates();
  },
  methods: {

    async fetchReservation(reservationId) {
      try {
        const response = await ReservationService.getReservationById(reservationId);
        this.reservation = {
          date: new Date(response.data.data.reservation.date).toISOString().split('T')[0], 
          plateName: response.data.data.reservation.plate, 
        };
      } catch (error) {
        console.error("Failed to fetch reservation details:", error.response?.data || error.message);
        this.error = "Failed to fetch reservation details.";
        this.$router.push("/reservation/list");
      }
    },

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

    async handleSubmit() {
      try {
        if (!this.reservation.plateName || !this.reservation.date) {
          alert("Dish and date are required!");
          return;
        }

        const updatedReservation = {
          plateName: this.reservation.plateName,
          date: this.reservation.date,    
        };

        await ReservationService.updateReservation(this.$route.params.id, updatedReservation);
        alert("Reservation updated successfully!");
        this.$router.push("/reservation/list");
        await UserService.updateCurrentUserInformation();
        location.reload();
      } catch (error) {
        console.error("Failed to update reservation:", error.response?.data || error.message);
        alert("Failed to update reservation. Please try again.");
      }
    },

    async handleDelete() {
      if (confirm("Are you sure you want to delete this reservation?")) {
        try {
          await ReservationService.deleteReservation(this.$route.params.id);
          alert("Reservation deleted successfully!");
          this.$router.push("/reservation/list");
          await UserService.updateCurrentUserInformation();
          location.reload();
        } catch (error) {
          console.error("Error deleting reservation:", error.response?.data || error.message);
          alert("Failed to delete reservation. Please try again.");
        }
      }
    },

    cancel() {
      this.$router.push("/reservation/list");
    },
  },
};
</script>

<style scoped>
.edit-reservation-form {
  max-width: 600px;
  margin: 20px auto;
  padding: 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.edit-reservation-form h2 {
  margin-bottom: 20px;
  font-size: 1.5rem;
  text-align: center;
}

.form-group {
  margin-bottom: 20px;
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
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

.form-actions {
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
  background: #000;  /* All buttons black */
}

.cancel-button:hover,
.delete-button:hover,
.edit-button:hover {
  background: #333; /* Darker shade on hover */
}

@media (max-width: 768px) {
  .edit-reservation-form {
    margin: 10px;
    padding: 15px;
  }

  .form-actions {
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
