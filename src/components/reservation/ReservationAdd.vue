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
  <div id="add-reservation-page">

    <h1 class="page-title">Create New Reservation</h1>

    <div class="main-content">
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
    </div>
  </div>
</template>

<style scoped>

.page-title {
  margin-top: 20px;
  margin-left: 270px;
}


.main-content {
  max-width: 600px;
  margin: 60px auto;
  margin-left: 550px; ;
  background: #f6f5f5;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
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
}

.form-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.cancel-button,
.create-button {
  padding: 10px;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  background: #000;
  color: white;
  border: none;
}

.cancel-button:hover,
.create-button:hover {
  background: #333;
}
</style>
