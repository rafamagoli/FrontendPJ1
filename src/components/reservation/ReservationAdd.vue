<script>
import PlateService from "@/core/services/PlateService";
import ReservationService from "@/core/services/ReservationService";

export default {
  data() {
    return {
      plates: [],
      reservation: {
        plateName: "",
        date: "",
      },
    };
  },
  async created() {
    try {
      const plateResponse = await PlateService.getAllPlates();
      this.plates = plateResponse.data.data.plates.map((plate) => ({
        name: plate.name,
      }));
    } catch (error) {
      console.error("Error fetching plates:", error.response?.data || error.message);
      alert("Failed to load plates. Please try again.");
    }
  },
  methods: {
    async handleSubmit() {
      try {
        const reservationData = {
          date: this.reservation.date,
          plateName: this.reservation.plateName,
        };

        console.log("Reservation data to be sent:", reservationData);

        const response = await ReservationService.createReservation(reservationData);
        console.log("Reservation created successfully:", response.data);

        alert(response.data.message || "Reservation created successfully!");
        this.$router.push("/reservation/list");
      } catch (error) {
        console.error("Error creating reservation:", error.response?.data || error.message);
        alert(
          error.response?.data?.message ||
            "Failed to create reservation. Please try again."
        );
      }
    },
    cancel() {
      this.$router.push("/reservation/list");
    },
  },
};
</script>

<template>
  <div id="add-reservation-page" class="page-background">
    <div class="main-content">
      <section class="add-reservation-form">
        <h2>Create New Reservation</h2>
        <form @submit.prevent="handleSubmit">
          <!-- Date Input -->
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
              <option v-for="plate in plates" :key="plate.name" :value="plate.name">
                {{ plate.name }}
              </option>
            </select>
          </div>

          <!-- Action Buttons -->
          <div class="form-actions">
            <button type="button" class="cancel-button" @click="cancel">
              Cancel
            </button>
            <button type="submit" class="create-button">
              Create Reservation
            </button>
          </div>
        </form>
      </section>
    </div>
  </div>
</template>

<style scoped>
/* Add Reservation Form Styling */
.add-reservation-form {
  max-width: 600px;
  margin: 20px auto;
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.add-reservation-form h2 {
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

.form-group input,
.form-group select {
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
.create-button {
  width: 48%;
  padding: 10px;
  font-size: 1rem;
  border: none;
  cursor: pointer;
  border-radius: 10px;
  background: #000000;
  color: white;
}

.cancel-button:hover,
.create-button:hover {
  background: #333;
}

/* Responsiveness */
@media (max-width: 768px) {
  .add-reservation-form {
    padding: 15px;
  }

  .form-actions {
    flex-direction: column;
    gap: 10px;
  }

  .cancel-button,
  .create-button {
    width: 100%;
  }
}
</style>