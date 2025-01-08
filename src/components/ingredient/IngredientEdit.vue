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
        allergen: "",  // Leaving allergen field empty for the user to fill manually
      },
      allergenOptions: ["Yes", "No"], // Provide Yes/No for allergen
    };
  },
  async created() {
    const ingredientName = this.$route.params.name; // Get the ingredient name from the URL

    if (!ingredientName) {
      console.error("Ingredient name is missing.");
      alert("Ingredient name is missing in the URL.");
      this.$router.push("/ingredient/list");
      return; // Stop further execution if the ingredient name is missing
    }

    try {
      // Fetch the ingredient details using the name
      const response = await IngredientService.getIngredientByName(ingredientName);
      
      if (response.data.status === 'success') {
        const ingredient = response.data.data.ingredient;
        this.ingredient = {
          name: ingredient.name,  // Set the ingredient name to be editable
          allergen: ingredient.allergen ? "Yes" : "No", // Set allergen state (Yes/No)
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
          allergen: this.ingredient.allergen === "Yes", // Convert Yes/No to Boolean (true/false)
        };

        // Use the name from the URL in the PUT request instead of the updated name
        const ingredientName = this.$route.params.name;
        await IngredientService.updateIngredient(ingredientName, updatedData); // Correct URL format

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
      <h1>Edit Ingredient</h1>
      
      <section class="edit-ingredient-form">
        <form @submit.prevent="handleSubmit">
          <!-- Ingredient Name - Editable now -->
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