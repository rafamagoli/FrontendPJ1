import axios from "axios";

const API_URL = "http://localhost:8081/api/ingredients";

const IngredientService = {
  getAllIngredients: () =>
    axios.get(`${API_URL}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    }),

  getIngredientByName: (name) => // Fetch by ingredient name instead of id
    axios.get(`${API_URL}/${name}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    }),

  createIngredient: (ingredientData) =>
    axios.post(`${API_URL}`, ingredientData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        "Content-Type": "application/json",
      },
    }),

  updateIngredient: (name, updatedData) => // Use name for update
    axios.put(`${API_URL}/${name}`, updatedData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        "Content-Type": "application/json",
      },
    }),

  deleteIngredient: (name) => // Use name for deletion
    axios.delete(`${API_URL}/${name}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    }),
};

export default IngredientService;
