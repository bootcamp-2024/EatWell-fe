import axios from "axios";
import api from "utils/api";

const instance = axios.create({
  baseURL: "https://96f4-2402-800-638c-a585-60f6-8ed4-a27b-77d2.ngrok-free.app",
  headers: {
    "ngrok-skip-browser-warning": "69420",
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});

const mealService = {
  async getIngredientNames() {
    const response = await api.get("/meal/getIngredients");
    return response;
  },

  async getMealPlanToday() {
    const response = await api.get("/meal/getUserTodayMealPlan");
    return response;
  },

  async getGenMealFastApi(queryString) {
    const response = await instance.get(
      `/calculate_meals_for_days?${queryString}`
    );
    return response;
  },

  async getReGenMealFastApi(queryString) {
    const response = await instance.get(`/regenerate_meal_day?${queryString}`);
    return response;
  },
};

export default mealService;
