<script>
import PlateService from "@/core/services/PlateService";

export default {
  data() {
    return {
      plates: [], // Plates fetched dynamically
      reservation: {
        plateId: "", // Plate ID selected from dropdown
        date: "", // Date entered by the user
      },
    };
  },
  computed: {
    availableDates() {
      const dates = [];
      const now = new Date();
      const currentHour = now.getHours();

      // Include today if it's before 10 AM
      let startDate = new Date();
      if (currentHour >= 10) {
        startDate.setDate(startDate.getDate() + 1);
      }

      // Add the next 7 days
      for (let i = 0; i < 7; i++) {
        const date = new Date(startDate);
        date.setDate(startDate.getDate() + i);
        dates.push(date.toISOString().split("T")[0]);
      }

      return dates;
    },
  },
  async created() {
    try {
      // Fetch plates
      const plateResponse = await PlateService.getAllPlates();
      this.plates = plateResponse.data.data.plates.map((plate) => ({
        id: plate._id,
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
        // Prepare the reservation data
        const reservationData = {
          plateId: this.reservation.plateId,
          date: this.reservation.date,
        };

        // Log reservation data for debugging
        console.log("Reservation data to be sent:", reservationData);

        // Add API call here to send the reservation data to the backend
        alert("Reservation created successfully!");
        this.$router.push("/reservation/list");
      } catch (error) {
        console.error("Error creating reservation:", error.response?.data || error.message);
        alert("Failed to create reservation. Please try again.");
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
    <div class="main-content">
      <h1>Create New Reservation</h1>

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
          <select id="plate" v-model="reservation.plateId" required>
            <option value="" disabled>Select a plate</option>
            <option v-for="plate in plates" :key="plate.id" :value="plate.id">
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
.main-content {
  max-width: 600px;
  margin: 60px auto;
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
