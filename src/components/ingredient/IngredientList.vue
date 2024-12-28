<script>
export default {
  data() {
    return {
      ingredients: [
        { id: 1, name: "Rice", allergen: null },
        { id: 2, name: "Grilled Fish", allergen: "Fish" },
        { id: 3, name: "Stewed Meat", allergen: null },
        { id: 4, name: "Onion", allergen: null },
        { id: 5, name: "Garlic", allergen: null },
        { id: 6, name: "Tomato", allergen: null },
        { id: 7, name: "Salt", allergen: null },
        { id: 8, name: "Potato", allergen: null },
      ],
    };
  },
  methods: {
    editIngredient(ingredient) {
      this.$router.push({
        name: "ingredient-edit",
        params: { id: ingredient.id },
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
  <div id="ingredients-list">
    <div class="main-content">
      <h1 id="page-title">All Ingredients</h1>

      <section class="cards">
        <!-- Left Column -->
        <div class="card ingredients-card">
          <div class="ingredient-grid">
            <div
              v-for="(ingredient, index) in ingredients.slice(0, 4)"
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
              v-for="(ingredient, index) in ingredients.slice(4, 8)"
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
}
</style>
