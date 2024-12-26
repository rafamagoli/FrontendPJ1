<script>
import PlateFormInput from './PlateFormInput.vue';

export default {
  components: {
    PlateFormInput
  },
  data() {
    return {
      plate: {
        name: "",
        price: "",
        description: "",
        ingredients: []
      },
      availableIngredients: [
      { id: 1, name: "Rice"},
        { id: 2, name: "Grilled Fish" },
        { id: 3, name: "Steak Meat" },
        { id: 4, name: "Onion"},
        { id: 5, name: "Garlic"},
        { id: 6, name: "Tomato"},
        { id: 7, name: "Salt"},
        { id: 8, name: "Potato"},
        { id: 9, name: "Mushrooms"},
        { id: 10, name: "Pasta"},
        { id: 11, name: "Tomato Sauce"},
        { id: 12, name: "Curry Sauce"},
        { id: 13, name: "Chicken"},
        { id: 14, name: "Vegetables"},
        { id: 15, name: "Pepper"}
      ]
    };
  },
  methods: {
    handleSubmit() {
      console.log("Plate created:", this.plate);
      this.$router.push("/plate/list");
    },
    cancel() {
      this.$router.push("/plate/list");
    },
    toggleIngredient(ingredient) {
      const index = this.plate.ingredients.findIndex(i => i.id === ingredient.id);
      if (index === -1) {
        this.plate.ingredients.push(ingredient);
      } else {
        this.plate.ingredients.splice(index, 1);
      }
    },
    isSelected(ingredient) {
      return this.plate.ingredients.some(i => i.id === ingredient.id);
    }
  }
};
</script>

<template>
  <div id="add-plate-page">
    <div class="main-content">
      <h1>New Plate</h1>

      <section class="add-plate-form">
        <form @submit.prevent="handleSubmit">
          <!-- Plate Name -->
          <PlateFormInput 
            name="Plate Name" 
            identifier="name" 
            v-model="plate.name"
          />

          <!-- Price -->
          <PlateFormInput 
            name="Price" 
            identifier="price" 
            type="number"
            v-model="plate.price"
          />

          <!-- Description -->
          <div class="form-group">
            <label for="description">Description</label>
            <textarea 
              id="description" 
              v-model="plate.description"
              required
              rows="4"
            ></textarea>
          </div>

          <!-- Ingredients Selection -->
          <div class="form-group">
            <label>Ingredients</label>
            <div class="ingredients-grid">
              <div 
                v-for="ingredient in availableIngredients"
                :key="ingredient.id"
                class="ingredient-item"
                :class="{ selected: isSelected(ingredient) }"
                @click="toggleIngredient(ingredient)"
              >
                {{ ingredient.name }}
              </div>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="form-actions">
            <button type="button" class="cancel-button" @click="cancel">
              Cancel
            </button>
            <button type="submit" class="create-button">
              Create
            </button>
          </div>
        </form>
      </section>
    </div>
  </div>
</template>

<style scoped>
.add-plate-form {
  max-width: 600px;
  margin: 60px auto;
  background: #f6f5f5;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.form-group textarea {
  width: 100%;
  padding: 8px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  resize: vertical;
}

.ingredients-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 10px;
  margin-top: 10px;
}

.ingredient-item {
  padding: 10px;
  background: white;
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
  text-align: center;
  transition: all 0.3s ease;
}

.ingredient-item:hover {
  background: #f0f0f0;
}

.ingredient-item.selected {
  background: #000;
  color: white;
  border-color: #000;
}

.form-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.cancel-button,
.create-button {
  width: 48%;
  padding: 10px;
  font-size: 1rem;
  border: none;
  cursor: pointer;
  border-radius: 10px;
  background: #000000;
  color: white;
}

.cancel-button:hover,
.create-button:hover {
  background: #333;
}

@media (max-width: 768px) {
  .form-actions {
    flex-direction: column;
    gap: 10px;
  }

  .cancel-button,
  .create-button {
    width: 100%;
  }
}
</style>