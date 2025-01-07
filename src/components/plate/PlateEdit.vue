<script>
import PlateFormInput from "./PlateFormInput.vue";
import PlateService from "@/core/services/PlateService";
import IngredientService from "@/core/services/IngredientService";

export default {
  components: {
    PlateFormInput,
  },
  data() {
    return {
      plate: {
        id: null,
        name: "",
        type: "",
        price: "",
        ingredients: [], // Will store ingredient names for easier backend integration
      },
      typeOptions: ["Meat", "Fish", "Vegetarian"], // Dropdown options
      availableIngredients: [], // Ingredients fetched from the backend
      error: null, // Error message placeholder
    };
  },
  async created() {
    const plateId = this.$route.params.id; // Retrieve plate ID from route params

    // Fetch plate details
    if (plateId) {
      await this.fetchPlateData(plateId);
    } else {
      console.error("No plate ID found. Redirecting...");
      this.$router.push("/plate/list");
    }

    // Fetch available ingredients
    await this.fetchIngredients();
  },
  methods: {
    async fetchPlateData(plateId) {
      try {
        const response = await PlateService.getPlateByName(plateId); // Fetch plate by ID
        const { data } = response;

        // Populate plate data
        this.plate = {
          id: data._id,
          name: data.name,
          type: data.type,
          price: data.price,
          ingredients: data.ingredients.map((ingredient) => ({
            name: ingredient, // Use name for consistency
          })),
        };
      } catch (error) {
        console.error("Error fetching plate data:", error);
        this.error = "Failed to fetch plate details. Redirecting...";
        this.$router.push("/plate/list");
      }
    },
    async fetchIngredients() {
      try {
        const response = await IngredientService.getAllIngredients();
        this.availableIngredients = response.data.data.ingredients.map((ingredient) => ({
          id: ingredient._id,
          name: ingredient.name,
        }));
      } catch (error) {
        console.error("Error fetching ingredients:", error);
        this.error = "Failed to fetch ingredients.";
      }
    },
    async handleSubmit() {
      try {
        if (!this.plate.name || !this.plate.type || !this.plate.price) {
          alert("Name, type, and price are required!");
          return;
        }

        // Prepare data for updating plate
        const updatedPlateData = {
          name: this.plate.name,
          type: this.plate.type,
          price: parseFloat(this.plate.price),
          ingredients: this.plate.ingredients.map((ingredient) => ingredient.name), // Send ingredient names
        };

        await PlateService.updatePlate(this.plate.id, updatedPlateData);
        alert("Plate updated successfully!");
        this.$router.push("/plate/list");
      } catch (error) {
        console.error("Error updating plate:", error);
        alert("Failed to update plate. Please try again.");
      }
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
    cancel() {
      this.$router.push("/plate/list");
    },
  },
};
</script>

<template>
  <div id="edit-plate-page">
    <div class="main-content">
      <h1>Edit Plate</h1>

      <section class="edit-plate-form">
        <form @submit.prevent="handleSubmit">
          <!-- Plate Name -->
          <PlateFormInput
            name="Plate Name"
            identifier="name"
            v-model="plate.name"
          />

          <!-- Plate Type -->
          <div class="form-group">
            <label for="type">Type</label>
            <select id="type" v-model="plate.type" required>
              <option value="" disabled>Select Plate Type</option>
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
            v-model="plate.price"
          />

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
              Update
            </button>
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
