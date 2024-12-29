<template>
  <div class="calendar-card" :class="{ 'modal-open': selectedReservation }">
    <FullCalendar :options="calendarOptions" />

    <!-- Modal para exibir detalhes da reserva -->
    <div v-if="selectedReservation" class="modal">
      <div class="modal-content">
        <h3>Reservation Details</h3>
        <p><strong>Dish:</strong> {{ selectedReservation.dish }}</p>
        <p><strong>Date:</strong> {{ formatDate(selectedReservation.date) }}</p>
        <p><strong>Employee:</strong> {{ selectedReservation.employee }}</p>
        <button @click="closeModal">Close</button>
      </div>
    </div>
  </div>
</template>

<script>
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";

export default {
  components: { FullCalendar },
  props: {
    reservations: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      selectedReservation: null, // Reserva selecionada para exibição
      calendarOptions: {
        plugins: [dayGridPlugin],
        initialView: "dayGridMonth",
        height: "auto",
        events: this.reservations.map((reservation) => ({
          title: reservation.dish,
          start: reservation.date,
          extendedProps: {
            employee: reservation.employee,
            dish: reservation.dish,
            date: reservation.date,
          },
        })),
        headerToolbar: {
          left: "",
          center: "title",
          right: "prev,next",
        },
        eventClick: this.handleEventClick, // Manipulador de clique no evento
      },
    };
  },
  methods: {
    handleEventClick(info) {
      // Busca os dados do evento clicado
      info.jsEvent.stopPropagation(); // Impede a propagação do clique
      this.selectedReservation = {
        dish: info.event.extendedProps.dish,
        date: info.event.extendedProps.date,
        employee: info.event.extendedProps.employee,
      };
      document.body.style.overflow = "hidden"; // Desativa scroll no fundo
    },
    closeModal() {
      this.selectedReservation = null; // Fecha o modal
      document.body.style.overflow = ""; // Reativa scroll no fundo
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
  watch: {
    reservations: {
      immediate: true,
      handler(newReservations) {
        this.calendarOptions.events = newReservations.map((reservation) => ({
          title: reservation.dish,
          start: reservation.date,
          extendedProps: {
            employee: reservation.employee,
            dish: reservation.dish,
            date: reservation.date,
          },
        }));
      },
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

/* Estilo para o modal */
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

/* Estilo para desativar a interatividade do calendário */
.modal-open .fc-view,
.modal-open .fc-daygrid-day {
  pointer-events: none;
  filter: brightness(0.8); /* Visualmente "escurece" as grades */
}
</style>