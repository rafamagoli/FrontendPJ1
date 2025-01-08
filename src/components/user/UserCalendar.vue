<template>
  <div class="calendar-card" :class="{ 'modal-open': selectedReservation }">
    <FullCalendar :options="calendarOptions" />

    <!-- Modal to show reservation details -->
    <div v-if="selectedReservation" class="modal">
      <div class="modal-content">
        <h3>Reservation Details</h3>
        <p><strong>Plate:</strong> {{ selectedReservation.plate }}</p>
        <p><strong>Date:</strong> {{ formatDate(selectedReservation.date) }}</p>
        <p><strong>NIF:</strong> {{ selectedReservation.employeeNIF }}</p>
        <button @click="closeModal">Close</button>
      </div>
    </div>
  </div>
</template>

<script>
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import ReservationService from "@/core/services/ReservationService";

export default {
  components: { FullCalendar },
  data() {
    return {
      selectedReservation: null, // Reservation selected for viewing
      calendarOptions: {
        plugins: [dayGridPlugin],
        initialView: "dayGridMonth",
        height: "auto",
        events: [], // Events will be populated dynamically
        headerToolbar: {
          left: "",
          center: "title",
          right: "prev,next",
        },
        eventClick: this.handleEventClick,
      },
    };
  },
  async mounted() {
    await this.loadReservations(); // Fetch reservations when the component mounts
  },
  methods: {
    async loadReservations() {
      try {
        // Get the logged-in user's NIF
        const user = JSON.parse(localStorage.getItem("currentUser"));
        const nif = user?.nif;

        if (!nif) {
          console.error("No NIF found for the logged-in user.");
          return;
        }

        // Fetch reservations for the user's NIF
        const response = await ReservationService.getReservationsByNif(nif);
        console.log("API Response:", response.data); // Debug the API response

        const reservations = response.data.data.reservations;

        if (!reservations || reservations.length === 0) {
          console.warn("No reservations found for this user.");
          return;
        }

        // Map reservations to FullCalendar events
        this.calendarOptions.events = reservations.map((reservation) => ({
          title: reservation.plate || "No Plate Specified", // Dish (plate) name
          start: reservation.date, // Reservation date
          allDay: true, // Treat event as all-day to remove time display
          extendedProps: {
            employeeNIF: reservation.employeeNIF, // Employee's NIF
            plate: reservation.plate, // Plate name
            date: reservation.date, // Reservation date
          },
        }));

        console.log("Mapped Events:", this.calendarOptions.events); // Debug the mapped events
      } catch (error) {
        console.error("Error loading reservations:", error);
      }
    },
    handleEventClick(info) {
      // Show reservation details in the modal
      this.selectedReservation = {
        plate: info.event.extendedProps.plate,
        date: info.event.extendedProps.date,
        employeeNIF: info.event.extendedProps.employeeNIF,
      };
    },
    closeModal() {
      this.selectedReservation = null; // Close the modal
    },
    formatDate(date) {
      return new Date(date).toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    },
  },
};
</script>


<style scoped>
.calendar-card {
  font-size: 10px;
  flex-direction: column;
  height: 100%;
}

.calendar-card .fc {
  flex: 1;
  width: 100%;
}

/* Modal styling */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  text-align: center;
  max-width: 400px;
  width: 90%;
}

.modal-content h3 {
  margin-bottom: 15px;
}

.modal-content p {
  margin: 10px 0;
}

.modal-content button {
  background-color: #000;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.modal-content button:hover {
  background-color: #444;
}

/* Calendar disabled during modal */
.modal-open .fc-view,
.modal-open .fc-daygrid-day {
  pointer-events: none;
  filter: brightness(0.8);
}
</style>
