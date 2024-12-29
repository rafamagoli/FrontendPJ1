<template>
  <div class="calendar-card">
    <FullCalendar :options="calendarOptions" />
  </div>
</template>

<script>
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";

export default {
  components: { FullCalendar },
  /* methods: {
    async fetchReservations() {
      const response = await fetch("/api/reservations");
      const data = await response.json();
      this.calendarOptions.events = data.map((reservation) => ({
        title: reservation.dish,
        start: reservation.date,
      }));
    },
  },
  created() {
    this.fetchReservations();
  }, */
  props: {
    reservations: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      calendarOptions: {
        plugins: [dayGridPlugin],
        initialView: "dayGridMonth",
        height: "auto",
        events: this.reservations.map((reservation) => ({
          title: reservation.dish,
          start: reservation.date,
        })),
        headerToolbar: {
          left: "",
          center: "title",
          right: "prev,next",
        },
      },
    };
  },
  watch: {
    // Atualiza o calendário se as reservas forem alteradas
    reservations: {
      immediate: true,
      handler(newReservations) {
        this.calendarOptions.events = newReservations.map((reservation) => ({
          title: reservation.dish,
          start: reservation.date,
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
</style>
