<script>
export default {
  data() {
    return {
      plates: [
        { 
          id: 1, 
          name: "Grilled Fish with Rice",
          price: "25.99",
          ingredients: ["Rice", "Grilled Fish", "Vegetables"]
        },
        { 
          id: 2, 
          name: "Steak with Potatoes",
          price: "32.99",
          ingredients: ["Steak", "Potatoes", "Vegetables"]
        },
        { 
          id: 3, 
          name: "Vegetarian Pasta",
          price: "18.99",
          ingredients: ["Pasta", "Tomato Sauce", "Mushrooms"]
        },
        { 
          id: 4, 
          name: "Chicken Curry",
          price: "23.99",
          ingredients: ["Chicken", "Rice", "Curry Sauce"]
        }
      ]
    };
  },
  methods: {
    editPlate(plate) {
      this.$router.push(`/plate/edit/${plate.name}`);
    },
    createPlate() {
      this.$router.push("/plate/add");
    },
    deletePlate() {
      this.$router.push("/plate/delete");
    }
  }
};
</script>

<template>
  <div id="plates-page">
    <div class="main-content">
      <h1 id="page-title">Plates</h1>
      
      <section class="cards">
        <!-- Left Column -->
        <div class="card plates-card">
          <div class="plate-grid">
            <div v-for="plate in plates.slice(0, 2)" 
                 :key="plate.id"
                 class="plate-box"
                 @click="editPlate(plate)">
              <div class="plate-name">{{ plate.name }}</div>
              <div class="plate-price">${{ plate.price }}</div>
              <div class="plate-ingredients">
                {{ plate.ingredients.join(", ") }}
              </div>
            </div>
          </div>
        </div>

        <!-- Right Column -->
        <div class="card plates-card">
          <div class="plate-grid">
            <div v-for="plate in plates.slice(2, 4)" 
                 :key="plate.id"
                 class="plate-box"
                 @click="editPlate(plate)">
              <div class="plate-name">{{ plate.name }}</div>
              <div class="plate-price">${{ plate.price }}</div>
              <div class="plate-ingredients">
                {{ plate.ingredients.join(", ") }}
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Action Buttons -->
      <div class="button-container">
        <button @click="createPlate" class="action-button">
          Create New Plate
        </button>
        <button type="button" class="delete-button" @click="deletePlate">
              Delete Plate
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.plate-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 15px;
  padding: 15px;
}

.plate-box {
  background: white;
  padding: 15px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}

.plate-box:hover {
  background-color: #f5f5f5;
}

.plate-name {
  font-weight: bold;
  margin-bottom: 5px;
}

.plate-price {
  color: #666;
  margin-bottom: 5px;
}

.plate-ingredients {
  font-size: 0.9em;
  color: #888;
}

.button-container {
  display: flex;
  justify-content: center;  
  margin-top: 20px;
  gap: 15px;
}

.action-button {
  width: 200px;  
  padding: 10px;
  background-color: #000;
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s;
}

.action-button:hover {
  background-color: #333;
}

.delete-button {
  width: 19%;
  padding: 10px;
  font-size: 1rem;
  border: none;
  cursor: pointer;
  border-radius: 10px;
  background: #000000;
  color: white;
}

.delete-button:hover {
  background: #333;
}

@media (max-width: 768px) {
  .button-container {
    flex-direction: column;
  }
  
  .action-button {
    width: 100%;
  }
}
</style>