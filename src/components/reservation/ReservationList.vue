<script>
import ReservationService from "@/core/services/ReservationService";
import UserService from "@/core/services/UserService";
import UserCalendar from "@/components/user/UserCalendar.vue";

export default {
  components: { UserCalendar },
  data() {
    return {
      searchQuery: "",
      reservations: [],
      currentUser: null,
      calendarOptions: {
        events: [],
        headerToolbar: {
          left: "",
          center: "title",
          right: "prev,next",
        },
        eventClick: this.handleEventClick,
      },
    };
  },
  computed: {
    filteredReservations() {
      return this.reservations.filter((reservation) =>
        reservation.plate.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
  },
  methods: {
    async fetchReservations() {
      try {
        console.log("Fetching reservations...");
        const user = UserService.getCurrentUser();
        const nif = user?.nif;

        if (!nif) {
          console.error("No NIF found for the logged-in user.");
          return;
        }

        const response = await ReservationService.getReservationsByNif(nif);
        console.log("API Response:", response.data);

        this.reservations = response.data.data.reservations.map((reservation) => ({
          id: reservation._id,
          plate: reservation.plate || "Unnamed Plate",
          date: reservation.date,
        }));

        console.log("Mapped reservations:", this.reservations);

        this.calendarOptions.events = this.reservations.map((reservation) => ({
          title: reservation.plate,
          start: reservation.date,
          allDay: true,
          extendedProps: {
            plate: reservation.plate,
            date: reservation.date,
          },
        }));
      } catch (error) {
        console.error("Error fetching reservations:", error.response?.data || error.message);
        alert("Failed to load reservations. Please try again.");
      }
    },
    goToEditReservation(id) {
      this.$router.push(`/reservation/edit/${id}`);
    },
    createNewReservation() {
      this.$router.push("/reservation/add");
    },
    handleEventClick(info) {
      const selectedReservation = {
        plate: info.event.extendedProps.plate, 
        date: info.event.extendedProps.date,
      };
      console.log("Selected Reservation:", selectedReservation);
    },
    formatDate(dateStr) {
      const options = { weekday: "short", year: "numeric", month: "short", day: "numeric" };
      return new Date(dateStr).toLocaleDateString(undefined, options);
    },
  },
  async created() {
    console.log("Reservation List component created.");
    await this.fetchReservations();
  },
};
</script>

<template>
  <div id="active-reservations-page" class="page-background">
    <div class="main-content">
      <h1 id="page-title">My Active Reservations</h1>

      <section class="cards reservation-container">
        <!-- Active Reservations Card -->
        <div class="card reservation-section">
          <div class="controls">
            <div class="search-control">
              <input
                type="search"
                v-model="searchQuery"
                placeholder="Search reservations..."
                class="search-input"
              />
            </div>
          </div>

          <div class="reservation-list">
            <div
              v-for="reservation in filteredReservations"
              :key="reservation.id"
              class="reservation-item"
              @click="goToEditReservation(reservation.id)"
            >
              <span>{{ reservation.plate }}</span> <!-- Updated 'dish' to 'plate' -->
              <span class="reservation-date">{{ formatDate(reservation.date) }}</span>
            </div>
          </div>
        </div>

        <!-- Calendar Card -->
        <div class="card calendar-section">
          <h2>Reservation Calendar</h2>
          <div class="calendar-wrapper">
            <UserCalendar :reservations="reservations" />
          </div>
        </div>

        <!-- Create New Reservation Button -->
        <div class="button-container">
          <button @click="createNewReservation" class="action-button">
            Create New Reservation
          </button>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
.reservation-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin: 20px auto;
  max-width: 1200px;
}

.reservation-section {
  grid-column: 1;
  padding: 20px;
  background: #f6f5f5;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.calendar-section {
  grid-column: 2;
  padding: 20px;
  background: #f6f5f5;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.calendar-wrapper {
  height: 400px;
}

.controls {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.search-input {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 200px;
}

.reservation-list {
  max-height: 200px;
  overflow-y: auto;
  border: 1px solid #ddd;
  padding: 10px;
  background: #fff;
}

.reservation-list ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.reservation-item {
  padding: 15px;
  border: 1px solid #eee;
  margin-bottom: 10px;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  background: white;
}

.reservation-item:hover {
  background-color: #f5f5f5;
}

.button-container {
  grid-column: 1 / -1;
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.action-button {
  width: 200px;
  padding: 10px;
  background: #000;
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-size: 1rem;
}

.action-button:hover {
  background: #333;
}

@media (max-width: 768px) {
  .reservation-container {
    grid-template-columns: 1fr;
  }

  .calendar-section,
  .reservation-section {
    grid-column: 1;
  }

  .controls {
    flex-direction: column;
    gap: 10px;
  }

  .search-input {
    width: 100%;
  }
}
</style>
