<template>
    <div class="main-content">
      <h1 id="page-title">New Reservation</h1>
  
      <div class="reservation-form">
        <form @submit.prevent="handleSubmit">
          <div class="form-group">
            <label for="employeeId">Employee</label>
            <select 
              id="employeeId" 
              v-model="reservation.employeeId" 
              required
            >
              <option value="">Select an employee</option>
              <option v-for="employee in employees" 
                      :key="employee.id" 
                      :value="employee.id">
                {{ employee.name }}
              </option>
            </select>
          </div>
  
          <div class="form-group">
            <label for="date">Date</label>
            <select 
              id="date" 
              v-model="reservation.date" 
              required
            >
              <option value="">Select a date</option>
              <option 
                v-for="date in availableDates" 
                :key="date"
                :value="date"
              >
                {{ formatDate(date) }}
              </option>
            </select>
          </div>
  
          <div class="form-group">
            <label for="dish">Dish</label>
            <select 
              id="dish" 
              v-model="reservation.dish" 
              required
            >
              <option value="">Select a dish</option>
              <option 
                v-for="plate in plates" 
                :key="plate.id" 
                :value="plate.name"
              >
                {{ plate.name }} - ${{ plate.price }}
              </option>
            </select>
          </div>
  
          <button type="submit" class="action-button">
            Create Reservation
          </button>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        employees: [
          { id: 1, name: "Bulma Garcia" },
          { id: 2, name: "Pepper Stark" },
          { id: 3, name: "Martini Silva" },
          { id: 4, name: "Sansa Stark" },
        ],
        plates: [
          { 
            id: 1, 
            name: "Grilled Fish",
            price: "12.99",
          },
          { 
            id: 2, 
            name: "Grilled Steak",
            price: "15.99",
          },
          { 
            id: 3, 
            name: "Shrimp Stew",
            price: "13.99",
          }
        ],
        reservation: {
          employeeId: "",
          date: "",
          dish: ""
        }
      };
    },
    computed: {
      availableDates() {
        const dates = [];
        const now = new Date();
        const currentHour = now.getHours();
        
        // If it's before 10 AM, include today
        let startDate = new Date();
        if (currentHour >= 10) {
          startDate.setDate(startDate.getDate() + 1);
        }
        
        // Add 7 days
        for (let i = 0; i < 7; i++) {
          const date = new Date(startDate);
          date.setDate(startDate.getDate() + i);
          dates.push(date.toISOString().split('T')[0]);
        }
        
        return dates;
      }
    },
    methods: {
      formatDate(dateStr) {
        return new Date(dateStr).toLocaleDateString('en-US');
      },
      handleSubmit() {
        // Here you would make an API call to save the reservation
        console.log("Reservation created:", this.reservation);
        this.$router.push('/reservation/list');
      }
    }
  };
  </script>
  
  <style scoped>
  .reservation-form {
    max-width: 500px;
    margin: 20px auto;
    padding: 20px;
    background:#f6f5f5;
    border-radius: 8px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  .form-group label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
  }
  
  .form-group select {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  .action-button {
    width: 100%;
    padding: 10px;
    background: #000;
    color: white;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    font-size: 1rem;
    margin-top: 20px;
  }
  
  .action-button:hover {
    background: #333;
  }
  
  @media (max-width: 768px) {
    .reservation-form {
      margin: 10px;
      padding: 15px;
    }
  }
  </style>