<script>
import IngredientService from "@/core/services/IngredientService";

export default {
  data() {
    return {
      ingredients: [],
    };
  },
  async created() {
    try {
      const response = await IngredientService.getAllIngredients();

      this.ingredients = response.data.data.ingredients.map((ingredient) => ({
        name: ingredient.name, 
      }));

      console.log("Fetched ingredients:", this.ingredients);
    } catch (error) {
      console.error("Error fetching ingredients:", error.response?.data || error.message);
      alert("Failed to load ingredients. Please try again.");
    }
  },
  methods: {
    editIngredient(ingredient) {
      this.$router.push({
        name: "ingredient-edit",
        params: { name: ingredient.name }, 
      });
    },
    createIngredient() {
      this.$router.push("/ingredient/add");
    },
    createPlate() {
      this.$router.push("/plate/add");
    },
  },
};
</script>

<template>
  <div id="ingredients-list" class="page-background">
    <div class="main-content">
      <h1 id="page-title">All Ingredients</h1>

      <section class="cards">
        <!-- Left Column -->
        <div class="card ingredients-card">
          <div class="ingredient-grid">
            <div
              v-for="(ingredient, index) in ingredients.slice(0, Math.ceil(ingredients.length / 2))"
              :key="index"
              class="ingredient-box"
              @click="editIngredient(ingredient)"
            >
              {{ ingredient.name }}
            </div>
          </div>
        </div>

        <!-- Right Column -->
        <div class="card ingredients-card">
          <div class="ingredient-grid">
            <div
              v-for="(ingredient, index) in ingredients.slice(Math.ceil(ingredients.length / 2))"
              :key="index"
              class="ingredient-box"
              @click="editIngredient(ingredient)"
            >
              {{ ingredient.name }}
            </div>
          </div>
        </div>
      </section>

      <!-- Action Buttons -->
      <div class="button-container">
        <button @click="createIngredient" class="action-button">
          Create New Ingredient
        </button>
        <button @click="createPlate" class="action-button">
          Create New Plate
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.ingredient-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 15px;
  padding: 15px;
}

.ingredient-box {
  background: white;
  padding: 15px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
  text-align: center;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.ingredient-box:hover {
  background-color: #f5f5f5;
}

.cards {
  display: flex;
  justify-content: space-between;
}

.ingredients-card {
  width: 48%;  /* Set each column width to 48% */
}

.button-container {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  gap: 15px;
}

.action-button {
  flex: 1;
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

  .cards {
    flex-direction: column;
  }

  .ingredients-card {
    width: 100%;
  }
}
</style>
