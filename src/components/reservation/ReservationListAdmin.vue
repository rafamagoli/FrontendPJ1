<template>
  <div id="all-reservations-page" class="page-background">
    <div class="main-content">
      <h1 id="page-title">All Reservations</h1>

      <section class="cards reservation-container">
        <div class="reservation-section">
          <div class="controls">
            <div class="search-control">
              <input
                type="search"
                v-model="searchQuery"
                placeholder="Search by employee name..."
                class="search-input"
              />
            </div>
          </div>

          <div class="reservation-list">
            <div
              v-for="reservation in sortedReservations"
              :key="reservation.id"
              class="reservation-item"
              @click="editReservation(reservation.id)"
            >
              <p><strong>Plate:</strong> {{ reservation.plate }}</p>
              <p><strong>Name:</strong> {{ reservation.name }}</p>
              <p><strong>Date:</strong> {{ formatDate(reservation.date) }}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import ReservationService from "@/core/services/ReservationService";
import UserService from "@/core/services/UserService";

export default {
  data() {
    return {
      reservations: [],
      searchQuery: "",
      error: null,
    };
  },
  computed: {
    sortedReservations() {
      const filtered = this.reservations.filter((res) =>
        res.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
      return filtered.sort((a, b) => new Date(a.date) - new Date(b.date));
    },
  },
  async created() {
    await this.fetchReservations();
  },
  methods: {
    async fetchReservations() {
      try {
        const response = await ReservationService.getAllReservations();
        const reservations = response.data.data.reservations;

        for (let reservation of reservations) {
          const user = await UserService.getUserByNIF(reservation.employeeNIF);
          reservation.name = user.data.name;
        }

        this.reservations = reservations.map((reservation) => ({
          id: reservation._id,
          plate: reservation.plate,
          name: reservation.name,
          date: reservation.date,
        }));
      } catch (error) {
        console.error("Failed to fetch reservations:", error.response?.data || error.message);
        this.error = "Failed to load reservations. Please try again.";
      }
    },
    formatDate(dateStr) {
      const options = { weekday: "short", year: "numeric", month: "short", day: "numeric" };
      return new Date(dateStr).toLocaleDateString(undefined, options);
    },
    createNewReservation() {
      this.$router.push("/reservation/add");
    },
    editReservation(id) {
      this.$router.push(`/reservation/edit/${id}`);
    },
  },
};
</script>

<style scoped>
/* Style for the reservation list container */
.reservation-container {
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
  margin: 20px auto;
  max-width: 800px;
}

.reservation-section {
  padding: 20px;
  background: #f6f5f5;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.controls {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;
}

.search-input {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
  max-width: 300px;
}

.reservation-list {
  margin-top: 20px;
}

.weekly-tasks {
  list-style: none;
  padding: 0;
  margin: 0;
}

.reservation-item {
  display: block; /* Changed to block to stack elements vertically */
  padding: 15px;
  background-color: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  margin-bottom: 10px;
  cursor: pointer;
}

.reservation-title {
  font-weight: bold;
  font-size: 1rem;
  margin-bottom: 5px; /* Add space between plate and name */
}

.reservation-name,
.reservation-date {
  font-size: 0.9rem;
  color: #555;
  margin-bottom: 5px; /* Add space between name and date */
}

@media (max-width: 768px) {
  .reservation-container {
    padding: 10px;
  }

  .controls {
    justify-content: center;
  }

  .reservation-item {
    align-items: flex-start;
  }
}
</style>
