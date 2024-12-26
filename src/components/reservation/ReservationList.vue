<template>
    <div class="main-content">
      <h1 id="page-title">Active Reservations</h1>
  
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
            <div v-for="reservation in sortedReservations" 
                 :key="reservation.id" 
                 class="reservation-item"
                 @click="editReservation(reservation.id)">
              <span>{{ reservation.dish }}</span>
              <span class="reservation-date">{{ formatDate(reservation.date) }}</span>
            </div>
          </div>
        </div>
  
        <!-- Calendar Card -->
        <div class="card calendar-section">
          <h2>Reservations</h2>
          <div class="calendar-wrapper">
            <FullCalendar :options="calendarOptions" />
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
  </template>
  
  <script>
  import FullCalendar from "@fullcalendar/vue3";
  import dayGridPlugin from "@fullcalendar/daygrid";
  
  export default {
    components: { 
      FullCalendar 
    },
    data() {
      return {
        activeReservations: [
          { id: 1, dish: "Grilled Fish", date: "2024-12-10" },
          { id: 2, dish: "Grilled Steak", date: "2024-12-15" },
          { id: 3, dish: "Shrimp Stew", date: "2024-12-19" }
        ],
        searchQuery: "",
        sortBy: "date",
        calendarOptions: {
          plugins: [dayGridPlugin],
          initialView: "dayGridMonth",
          height: 400,
          headerToolbar: {
            left: '',
            center: 'title',
            right: 'prev,next'
          },
          events: [
            { title: "Grilled Fish", start: "2024-12-10" },
            { title: "Grilled Steak", start: "2024-12-15" },
            { title: "Shrimp Stew", start: "2024-12-19" }
          ],
        }
      };
    },
    computed: {
      sortedReservations() {
        const filtered = this.activeReservations.filter(res => 
          res.dish.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
        
        return filtered.sort((a, b) => {
          if (this.sortBy === 'date') {
            return new Date(a.date) - new Date(b.date);
          }
          return 0;
        });
      }
    },
    methods: {
      formatDate(date) {
        return new Date(date).toLocaleDateString('en-US');
      },
      createNewReservation() {
        this.$router.push('/reservation/add');
      },
      editReservation(id) {
        this.$router.push(`/reservation/edit/${id}`);
      }
    }
  };
  </script>
  
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
    background:#f6f5f5;
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