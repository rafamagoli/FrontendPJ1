<script>
import IngredientFormInput from './IngredientFormInput.vue';

export default {
  components: {
    IngredientFormInput
  },
  data() {
    return {
      ingredient: {
        name: "",
        allergen: ""
      },
      allergenOptions: [
        "None",
        "Gluten",
        "Milk",
        "Egg",
        "Fish",
        "Shellfish",
        "Nuts",
        "Soy"
      ]
    };
  },
  created() {
    // In a real application, you would fetch the ingredient data using the ID from the route
    const ingredientId = this.$route.params.id;
    // Simulating fetching ingredient data
    this.ingredient = {
      id: ingredientId,
      name: "Example Ingredient",
      allergen: "None"
    };
  },
  methods: {
    handleSubmit() {
      console.log("Ingredient updated:", this.ingredient);
      this.$router.push("/ingredient/list");
    },
    deleteIngredient() {
      if (confirm("Are you sure you want to delete this ingredient?")) {
        console.log("Ingredient deleted:", this.ingredient);
        this.$router.push("/ingredient/list");
      }
    },
    cancel() {
      this.$router.push("/ingredient/list");
    }
  }
};
</script>

<template>
  <div id="edit-ingredient-page">
    <div class="main-content">
      <section class="edit-ingredient-form">
        <h2>Edit Ingredient</h2>
        <form @submit.prevent="handleSubmit">
          <!-- Ingredient Name - Now read-only -->
          <div class="form-group">
            <label for="name">Ingredient Name</label>
            <input 
              type="text" 
              id="name" 
              v-model="ingredient.name"
              readonly
              class="readonly-input"
            />
          </div>

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
            <button type="button" class="delete-button" @click="deleteIngredient">
              Delete
            </button>
            <button type="submit" class="update-button">
              Update
            </button>
          </div>
        </form>
      </section>
    </div>
  </div>
</template>

<style scoped>
.edit-ingredient-form {
  max-width: 600px;
  margin: 20px auto;
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.edit-ingredient-form h2 {
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

/* Style for read-only input */
.readonly-input {
  width: 100%;
  padding: 8px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  background-color: #f5f5f5;
  color: #666;
  cursor: not-allowed;
}

.form-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
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

@media (max-width: 768px) {
  .form-actions {
    flex-direction: column;
    gap: 10px;
  }

  .delete-button,
  .update-button {
    width: 100%;
  }
}
</style>