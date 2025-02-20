<script>
import PlateFormInput from './PlateFormInput.vue';
import IngredientService from "@/core/services/IngredientService";
import PlateService from "@/core/services/PlateService";

export default {
  components: {
    PlateFormInput,
  },
  data() {
    return {
      plate: {
        name: "",
        price: "",
        type: "",
        ingredients: [],
      },
      availableIngredients: [],
      plateTypes: ["Meat", "Fish", "Vegetarian"],
    };
  },
  async created() {
    try {
      const response = await IngredientService.getAllIngredients();
      this.availableIngredients = response.data.data.ingredients.map((ingredient) => ({
        id: ingredient._id,
        name: ingredient.name,
      }));
    } catch (error) {
      console.error("Error fetching ingredients:", error.response?.data || error.message);
      alert("Failed to load ingredients. Please try again.");
    }
  },
  methods: {
    async handleSubmit() {
      try {
        if (!this.plate.name || !this.plate.price || !this.plate.type) {
          alert("Name, price, and type are required!");
          return;
        }

        const plateData = {
          name: this.plate.name,
          price: parseFloat(this.plate.price),
          type: this.plate.type,
          ingredients: this.plate.ingredients.map((ingredient) => ingredient.name), // Send ingredient names
        };

        await PlateService.createPlate(plateData);
        alert("Plate created successfully!");
        this.$router.push("/plate/list");
      } catch (error) {
        console.error("Error creating plate:", error.response?.data || error.message);
        alert("Failed to create plate. Please try again.");
      }
    },
    cancel() {
      this.$router.push("/plate/list");
    },
    toggleIngredient(ingredient) {
      const index = this.plate.ingredients.findIndex((i) => i.name === ingredient.name);
      if (index === -1) {
        this.plate.ingredients.push(ingredient);
      } else {
        this.plate.ingredients.splice(index, 1);
      }
    },
    isSelected(ingredient) {
      return this.plate.ingredients.some((i) => i.name === ingredient.name);
    },
  },
};
</script>


<template>
  <div id="add-plate-page" class="page-background">
    <div class="main-content">
      <section class="add-plate-form">
        <h2>Create New Plate</h2>
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

          <!-- Plate Type -->
          <div class="form-group">
            <label for="type">Type</label>
            <select id="type" v-model="plate.type" required>
              <option value="" disabled>Select Plate Type</option>
              <option v-for="type in plateTypes" :key="type" :value="type">
                {{ type }}
              </option>
            </select>
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
/* Add Plate Form Styling */
.add-plate-form {
  max-width: 600px;
  margin: 20px auto;
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.add-plate-form h2 {
  margin-bottom: 20px;
  font-size: 1.5rem;
  text-align: center;
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
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
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

/* Responsiveness */
@media (max-width: 768px) {
  .add-plate-form {
    padding: 15px;
  }

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