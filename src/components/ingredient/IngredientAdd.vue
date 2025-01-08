<script>
import IngredientFormInput from "./IngredientFormInput.vue";
import IngredientService from "@/core/services/IngredientService";

export default {
  components: {
    IngredientFormInput,
  },
  data() {
    return {
      ingredient: {
        name: "",
        allergen: "",
      },
      allergenOptions: ["Yes", "No"],
    };
  },
  methods: {
    async handleSubmit() {
      try {
        if (!this.ingredient.name.trim()) {
          alert("Ingredient name is required!");
          return;
        }

        const ingredientData = {
          name: this.ingredient.name.trim(),
          allergen: this.ingredient.allergen === "Yes" ? true : false,
        };

        await IngredientService.createIngredient(ingredientData);

        alert("Ingredient created successfully!");
        this.$router.push("/ingredient/list");
      } catch (error) {
        console.error("Error creating ingredient:", error.response?.data || error.message);
        alert("Failed to create ingredient. Please try again.");
      }
    },
    cancel() {
      this.$router.push("/ingredient/list");
    },
  },
};
</script>

<template>
  <div id="add-ingredient-page">
    <div class="main-content">
      <h1>New Ingredient</h1>

      <section class="add-ingredient-form">
        <form @submit.prevent="handleSubmit">
          <!-- Ingredient Name -->
          <IngredientFormInput 
            name="Ingredient Name" 
            identifier="name" 
            v-model="ingredient.name"
          />

          <!-- Allergen -->
          <div class="form-group">
            <label for="allergen">Allergen</label>
            <select id="allergen" v-model="ingredient.allergen" required>
              <option value="" disabled>Select</option>
              <option v-for="option in allergenOptions" 
                      :key="option" 
                      :value="option">
                {{ option }}
              </option>
            </select>
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
.add-ingredient-form {
  max-width: 600px;
  margin: 60px auto;
  background: #f6f5f5;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.add-ingredient-form h2 {
  margin-bottom: 20px;
  font-size: 1.5rem;
  text-align: center;
}

.form-group {
  margin-bottom: 15px;
}

.form-group select {
  width: 100%;
  padding: 8px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
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