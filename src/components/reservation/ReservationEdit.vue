<template>
    <div class="main-content page-background">
      <h1 id="page-title">Edit Reservation</h1>
  
      <div class="edit-form">
        <form @submit.prevent="handleEdit">
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
              <option v-for="plate in plates" 
                      :key="plate.id" 
                      :value="plate.name">
                {{ plate.name }} - ${{ plate.price }}
              </option>
            </select>
          </div>
  
          <div class="button-group">
            <button type="button" @click="handleDelete" class="delete-button">
              Delete
            </button>
            <button type="submit" class="edit-button">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  import ReservationService from "@/core/services/ReservationService";
  import PlateService from "@/core/services/PlateService";
  
  export default {
    data() {
      return {
        reservation: {
          date: "",
          plate: "", // Plate name
        },
        availablePlates: [], // Dynamically fetched plates
        error: null,
      };
    },
    async created() {
      const reservationId = this.$route.params.id; // Get the reservation ID from route params
  
      if (reservationId) {
        await this.fetchReservation(reservationId); // Fetch the reservation details
      } else {
        console.error("No reservation ID found. Redirecting...");
        this.$router.push("/reservation/list");
      }
  
      await this.fetchAvailablePlates(); // Fetch available plates
    },
    methods: {
      async fetchReservation(reservationId) {
        try {
          const response = await ReservationService.getReservationById(reservationId);
          this.reservation = {
            date: response.data.data.reservation.date,
            plate: response.data.data.reservation.dish,
          };
        } catch (error) {
          console.error("Failed to fetch reservation details:", error.response?.data || error.message);
          this.error = "Failed to fetch reservation details.";
          this.$router.push("/reservation/list");
        }
      },
      async fetchAvailablePlates() {
        try {
          const response = await PlateService.getAllPlates();
          this.availablePlates = response.data.data.plates.map((plate) => ({
            id: plate._id,
            name: plate.name,
          }));
        } catch (error) {
          console.error("Failed to fetch plates:", error.response?.data || error.message);
          this.error = "Failed to fetch plates.";
        }
      },
      async handleSubmit() {
        try {
          if (!this.reservation.date || !this.reservation.plate) {
            alert("Date and plate are required!");
            return;
          }
  
          const updatedReservation = {
            date: this.reservation.date,
            dish: this.reservation.plate,
          };
  
          await ReservationService.updateReservation(this.$route.params.id, updatedReservation);
          alert("Reservation updated successfully!");
          this.$router.push("/reservation/list");
        } catch (error) {
          console.error("Failed to update reservation:", error.response?.data || error.message);
          alert("Failed to update reservation. Please try again.");
        }
      },
      cancel() {
        this.$router.push("/reservation/list");
      },
    },
  };
  </script>  

<style scoped>
.edit-form {
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

.button-group {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.delete-button,
.edit-button {
  width: 48%;
  padding: 10px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  color: white;
  font-size: 1rem;
}

.delete-button {
  background: #000;
}

.edit-button {
  background: #000;
}

.delete-button:hover,
.edit-button:hover {
  background: #333;
}

@media (max-width: 768px) {
  .edit-form {
    margin: 10px;
    padding: 15px;
  }
  
  .button-group {
    flex-direction: column;
    gap: 10px;
  }
  
  .delete-button,
  .edit-button {
    width: 100%;
  }
}
</style>