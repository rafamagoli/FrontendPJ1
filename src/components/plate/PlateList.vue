<template>
  <div id="plates-page" class="page-background">
    <div class="main-content">
      <h1 id="page-title">Plates</h1>

      <section class="cards">
        <!-- Left Column -->
        <div class="card plates-card">
          <div class="plate-grid">
            <div v-for="(plate, index) in leftPlates" :key="plate._id" class="plate-box" @click="currentUser.isCanteenManager ? editPlate(plate) : null">
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
            <div v-for="(plate, index) in rightPlates" :key="plate._id" class="plate-box" @click="currentUser.isCanteenManager ? editPlate(plate) : null">
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
        <button v-if="currentUser.isCanteenManager" @click="createPlate" class="action-button">
          Create New Plate
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import PlateService from "@/core/services/PlateService";
import UserService from "@/core/services/UserService";

export default {
  data() {
    return {
      plates: [],
      currentUser: UserService.getCurrentUser(),
      leftPlates: [],
      rightPlates: [],
    };
  },
  async created() {
    await this.fetchPlates();
  },
  methods: {
    async fetchPlates() {
      try {
        const response = await PlateService.getAllPlates();
        this.plates = response.data.data.plates;

        const midIndex = Math.ceil(this.plates.length / 2);
        this.leftPlates = this.plates.slice(0, midIndex);
        this.rightPlates = this.plates.slice(midIndex);

      } catch (error) {
        console.error("Error fetching plates:", error);
        alert("Failed to load plates. Please try again later.");
      }
    },
    editPlate(plate) {
      this.$router.push({ name: "plate-edit", params: { name: plate.name } });
    },
    createPlate() {
      this.$router.push("/plate/add");
    },
  },
};
</script>

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
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
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

@media (max-width: 768px) {
  .button-container {
    flex-direction: column;
  }

  .action-button {
    width: 100%;
  }
}
</style>
