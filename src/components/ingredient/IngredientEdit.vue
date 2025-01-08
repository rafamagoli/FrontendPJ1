<script>
import IngredientService from "@/core/services/IngredientService";
import UserCancelButton from "@/components/user/UserCancelButton.vue";

export default {
  components: {
    UserCancelButton,
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
  async created() {
    const ingredientName = decodeURIComponent(this.$route.params.name);

    if (!ingredientName) {
      console.error("Ingredient name is missing.");
      alert("Ingredient name is missing in the URL.");
      this.$router.push("/ingredient/list");
      return;
    }

    try {
      const response = await IngredientService.getIngredientByName(ingredientName);
      
      if (response.data.status === 'success') {
        const ingredient = response.data.data.ingredient;
        this.ingredient = {
          name: ingredient.name, 
          allergen: ingredient.allergen ? "Yes" : "No",
        };
      } else {
        console.error("Ingredient not found. Redirecting...");
        this.$router.push("/ingredient/list");
      }
    } catch (error) {
      console.error("Error fetching ingredient:", error.response?.data || error.message);
      alert("Failed to fetch ingredient details. Redirecting to list.");
      this.$router.push("/ingredient/list");
    }
  },
  methods: {
    async handleSubmit() {
      try {
        if (!this.ingredient.name.trim()) {
          alert("Ingredient name is required!");
          return;
        }

        const updatedData = {
          name: this.ingredient.name.trim(),
          allergen: this.ingredient.allergen === "Yes",
        };

        const ingredientName = decodeURIComponent(this.$route.params.name);
        await IngredientService.updateIngredient(ingredientName, updatedData);

        alert("Ingredient updated successfully!");
        this.$router.push("/ingredient/list");
      } catch (error) {
        console.error("Error updating ingredient:", error.response?.data || error.message);
        alert("Failed to update ingredient. Please try again.");
      }
    },
    async deleteIngredient() {
      if (confirm("Are you sure you want to delete this ingredient?")) {
        try {
          await IngredientService.deleteIngredient(this.ingredient.name);
          alert("Ingredient deleted successfully!");
          this.$router.push("/ingredient/list");
        } catch (error) {
          console.error("Error deleting ingredient:", error.response?.data || error.message);
          alert("Failed to delete ingredient. Please try again.");
        }
      }
    },
    cancel() {
      this.$router.push("/ingredient/list");
    },
  },
};
</script>

<template>
  <div id="edit-ingredient-page" class="page-background">
    <div class="main-content">
      <section class="edit-ingredient-form">
        <h2>Edit Ingredient</h2>

        <form @submit.prevent="handleSubmit">
          <!-- Ingredient Name -->
          <div class="form-group">
            <label for="name">Ingredient Name</label>
            <input 
              type="text" 
              id="name" 
              v-model="ingredient.name" 
              class="readonly-input" 
            />
          </div>

          <!-- Allergen -->
          <div class="form-group">
            <label for="allergen">Allergen</label>
            <select id="allergen" v-model="ingredient.allergen" required>
              <option value="" disabled>Select</option>
              <option 
                v-for="option in allergenOptions" 
                :key="option" 
                :value="option">
                {{ option }}
              </option>
            </select>
          </div>

          <!-- Action Buttons -->
          <div class="form-actions">
            <UserCancelButton :cancel="cancel" />

            <button 
              type="button" 
              class="delete-button" 
              @click="deleteIngredient">
              Delete
            </button>
            <button 
              type="submit" 
              class="update-button">
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
  margin: 40px auto;
  background: white;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.edit-ingredient-form h2 {
  margin-bottom: 20px;
  font-size: 1.8rem;
  text-align: center;
  font-weight: bold;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
  font-size: 1rem;
}

.form-group input,
.form-group select {
  width: 100%;
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

.form-actions {
  display: flex;
  justify-content: space-between; /* Space between buttons */
  gap: 15px; /* Fixed space between buttons */
  margin-top: 30px; /* Keep top margin */
}

.delete-button,
.update-button,
.cancel-button { /* Add cancel button */
  flex: 1;
  padding: 12px;
  font-size: 1rem;
  border: none;
  cursor: pointer;
  border-radius: 10px;
  background: #000;
  color: white;
  transition: background-color 0.3s ease;
}

.delete-button:hover,
.update-button:hover,
.cancel-button:hover { /* Add hover effect for all buttons */
  background: #333;
}

@media (max-width: 768px) {
  .form-actions {
    flex-direction: column;
  }

  .delete-button,
  .update-button,
  .cancel-button {
    width: 100%;
  }
}
</style>