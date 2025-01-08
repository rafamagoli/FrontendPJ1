<script>
import IngredientFormInput from "./IngredientFormInput.vue";
import UserCancelButton from "@/components/user/UserCancelButton.vue";
import IngredientService from "@/core/services/IngredientService";

export default {
  components: {
    IngredientFormInput,
    UserCancelButton,
  },
  data() {
    return {
      ingredient: {
        id: null,
        name: "",
        allergen: "",
      },
      allergenOptions: ["Yes", "No"],
    };
  },
  async created() {
    const ingredientId = this.$route.params.id;

    try {
      const response = await IngredientService.getAllIngredients();
      const ingredient = response.data.find(
        (item) => item.id === ingredientId || item._id === ingredientId
      );

      if (ingredient) {
        this.ingredient = {
          id: ingredient.id || ingredient._id,
          name: ingredient.name,
          allergen: ingredient.allergen || "No",
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
          allergen: this.ingredient.allergen || "No",
        };

        await IngredientService.updateIngredient(this.ingredient.id, updatedData);

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
          await IngredientService.deleteIngredient(this.ingredient.id);
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
        <h1>Edit Ingredient</h1>

      <section class="edit-ingredient-form">
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
            <UserCancelButton :cancel="cancel" />            

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
  margin: 60px auto;
  background: #f6f5f5;
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