<script>
import PlateFormInput from "./PlateFormInput.vue";
import UserCancelButton from "@/components/user/UserCancelButton.vue";

export default {
  components: {
    PlateFormInput,
    UserCancelButton,
  },
  data() {
    return {
      plate: {
        name: "",
        type: "",
        price: "",
        ingredients: [],
      },
      typeOptions: ["meat", "fish", "vegan", "vegetarian"],
      availableIngredients: {
        meat: [
          { id: 3, name: "Beef", category: "meat" },
          { id: 13, name: "Chicken", category: "meat" },
          { id: 4, name: "Onion", category: "common" },
          { id: 5, name: "Garlic", category: "common" },
          { id: 6, name: "Tomato", category: "common" },
          { id: 7, name: "Salt", category: "common" },
          { id: 8, name: "Potato", category: "common" },
          { id: 14, name: "Mixed Vegetables", category: "common" },
          { id: 15, name: "Black Pepper", category: "common" },
        ],
        fish: [
          { id: 1, name: "Rice", category: "common" },
          { id: 2, name: "Salmon", category: "fish" },
          { id: 16, name: "Cod", category: "fish" },
          { id: 4, name: "Onion", category: "common" },
          { id: 5, name: "Garlic", category: "common" },
          { id: 6, name: "Tomato", category: "common" },
          { id: 7, name: "Salt", category: "common" },
          { id: 14, name: "Mixed Vegetables", category: "common" },
          { id: 15, name: "Black Pepper", category: "common" },
        ],
        vegan: [
          { id: 4, name: "Onion", category: "common" },
          { id: 5, name: "Garlic", category: "common" },
          { id: 6, name: "Tomato", category: "common" },
          { id: 7, name: "Salt", category: "common" },
          { id: 8, name: "Potato", category: "common" },
          { id: 9, name: "Mushrooms", category: "vegan" },
          { id: 10, name: "Pasta", category: "common" },
          { id: 11, name: "Tomato Sauce", category: "common" },
          { id: 14, name: "Mixed Vegetables", category: "common" },
          { id: 15, name: "Black Pepper", category: "common" },
        ],
        vegetarian: [
          { id: 1, name: "Rice", category: "common" },
          { id: 4, name: "Onion", category: "common" },
          { id: 5, name: "Garlic", category: "common" },
          { id: 6, name: "Tomato", category: "common" },
          { id: 7, name: "Salt", category: "common" },
          { id: 8, name: "Potato", category: "common" },
          { id: 9, name: "Mushrooms", category: "vegetarian" },
          { id: 10, name: "Pasta", category: "common" },
          { id: 11, name: "Tomato Sauce", category: "common" },
          { id: 17, name: "Cheese", category: "vegetarian" },
          { id: 14, name: "Mixed Vegetables", category: "common" },
          { id: 15, name: "Black Pepper", category: "common" },
        ],
      },
      error: null,
    };
  },
  computed: {
    relevantIngredients() {
      if (!this.plate.type) return [];
      return this.availableIngredients[this.plate.type] || [];
    },
  },
  created() {
    const plateId = this.$route.params.id; // Retrieve the plate ID from route params
    if (plateId) {
      this.fetchPlateData(plateId); // Fetch plate data based on ID
    } else {
      console.error("No plate ID found. Redirecting...");
      this.$router.push("/plate/list");
    }
  },
  methods: {
    fetchPlateData(plateId) {
      // Mock plates data for fetching details based on ID
      const mockPlates = [
        {
          id: 1,
          name: "Grilled Fish with Rice",
          price: "25.99",
          ingredients: ["Rice", "Grilled Fish", "Vegetables"],
        },
        {
          id: 2,
          name: "Steak with Potatoes",
          price: "32.99",
          ingredients: ["Steak", "Potatoes", "Vegetables"],
        },
        {
          id: 3,
          name: "Vegetarian Pasta",
          price: "18.99",
          ingredients: ["Pasta", "Tomato Sauce", "Mushrooms"],
        },
        {
          id: 4,
          name: "Chicken Curry",
          price: "23.99",
          ingredients: ["Chicken", "Rice", "Curry Sauce"],
        },
      ];

      const plate = mockPlates.find((p) => p.id === parseInt(plateId, 10));
      if (plate) {
        this.plate = { ...plate };
      } else {
        this.error = "Plate not found.";
        console.error("Plate not found. Redirecting...");
        this.$router.push("/plate/list");
      }
    },
    handleSubmit() {
      console.log("Plate updated:", this.plate);
      this.$router.push("/plate/list");
    },
    cancel() {
      this.$router.push("/plate/list");
    },
  },
  /*async deletePlate() {
      if (confirm("Are you sure you want to delete this plate?")) {
        try {
          const response = await fetch(`http://localhost:8081/api/plates/${this.plate.name}`, {
            method: 'DELETE'
          });

          if (response.status === 204) {
            this.$router.push("/plate/list");
          } else {
            const data = await response.json();
            this.error = data.message || 'Failed to delete plate';
          }
        } catch (error) {
          console.error('Error:', error);
          this.error = 'Failed to delete plate';
        }
      }
    },
    toggleIngredient(ingredient) {
      const index = this.plate.ingredients.findIndex(i => i.name === ingredient.name);
      if (index === -1) {
        this.plate.ingredients.push(ingredient);
      } else {
        this.plate.ingredients.splice(index, 1);
      }
    },
    isSelected(ingredient) {
      return this.plate.ingredients.some(i => i.name === ingredient.name);
    }*/
};
</script>

<template>
  <div id="edit-plate-page">
    <div class="main-content">
      <h1>Edit Plate</h1>

      <div v-if="error" class="error-message">{{ error }}</div>

      <section class="edit-plate-form">
        <form @submit.prevent="handleSubmit">
          <!-- Plate Name - Read Only -->
          <div class="form-group">
            <label for="name">Plate Name</label>
            <input type="text" id="name" v-model="plate.name" />
          </div>

          <!-- Type Selection -->
          <div class="form-group">
            <label for="type">Type</label>
            <select id="type" v-model="plate.type" required>
              <option value="" disabled>Select type</option>
              <option v-for="type in typeOptions" :key="type" :value="type">
                {{ type }}
              </option>
            </select>
          </div>

          <!-- Price -->
          <PlateFormInput
            name="Price"
            identifier="price"
            type="number"
            step="0.01"
            v-model="plate.price"
          />

          <!-- Ingredients Selection -->
          <div class="form-group">
            <label>Ingredients</label>
            <div v-if="!plate.type" class="type-warning">
              Please select a plate type to see available ingredients
            </div>
            <div v-else class="ingredients-grid">
              <div
                v-for="ingredient in relevantIngredients"
                :key="ingredient.id"
                class="ingredient-item"
                :class="{
                  selected: isSelected(ingredient),
                  'common-ingredient': ingredient.category === 'common',
                }"
                @click="toggleIngredient(ingredient)"
              >
                {{ ingredient.name }}
                <span class="ingredient-category" :class="ingredient.category">
                  {{ ingredient.category }}
                </span>
              </div>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="form-actions">
            <UserCancelButton :cancel="cancel" />            
            <button type="button" class="delete-button" @click="deletePlate">
              Delete
            </button>
            <button type="submit" class="update-button">Update</button>
          </div>
        </form>
      </section>
    </div>
  </div>
</template>

<style scoped>
.edit-plate-form {
  max-width: 600px;
  margin: 60px auto;
  background: #f6f5f5;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.error-message {
  color: red;
  margin: 10px 0;
  padding: 10px;
  background-color: #ffebee;
  border-radius: 4px;
}

.type-warning {
  color: #856404;
  background-color: #fff3cd;
  padding: 10px;
  border-radius: 4px;
  margin-top: 10px;
  text-align: center;
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
  position: relative;
}

.ingredient-item:hover {
  background: #f0f0f0;
}

.ingredient-item.selected {
  background: #000;
  color: white;
  border-color: #000;
}

.ingredient-category {
  display: block;
  font-size: 0.7em;
  margin-top: 4px;
  padding: 2px 4px;
  border-radius: 3px;
  background: #f0f0f0;
  color: #666;
}

.ingredient-item.selected .ingredient-category {
  background: #333;
  color: #fff;
}

.common-ingredient {
  border: 1px dashed #ccc;
}

.form-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}
.form-actions > * {
  margin: 0; /* Remove the space between cancel and delete btn */
}
.delete-button,
.update-button {
  width: 48%;
  padding: 10px;
  font-size: 1rem;
  border: none;
  cursor: pointer;
  border-radius: 10px;
  background: #000000;
  color: white;
}

.delete-button:hover,
.update-button:hover {
  background: #333;
}

.ingredient-category.meat {
  background: #ffebee;
  color: #c62828;
}

.ingredient-category.fish {
  background: #e3f2fd;
  color: #1565c0;
}

.ingredient-category.vegan {
  background: #e8f5e9;
  color: #2e7d32;
}

.ingredient-category.vegetarian {
  background: #f3e5f5;
  color: #6a1b9a;
}

.ingredient-category.common {
  background: #f5f5f5;
  color: #616161;
}

@media (max-width: 768px) {
  .form-actions {
    flex-direction: column;
    gap: 10px;
  }
  .cancel-button,
  .delete-button,
  .update-button {
    width: 100%;
  }
}
</style>
