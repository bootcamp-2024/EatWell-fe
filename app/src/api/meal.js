import axios from "axios";
import api from "utils/api";

const instance = axios.create({
  baseURL: "https://4129-2402-800-638c-a585-6578-5af4-8ef9-d4a5.ngrok-free.app",
  headers: {
    "ngrok-skip-browser-warning": "69420",
  },
});

const mealService = {
  async getIngredientNames(queryString) {
    const response = await instance.get(
      `/calculate_meals_for_days?${queryString}`
    );
    return response;
  },

  async getGenMealFastApi(queryString) {
    const response = await instance.get(
      `https://4129-2402-800-638c-a585-6578-5af4-8ef9-d4a5.ngrok-free.app/calculate_meals_for_days?${queryString}`
    );
    return response;
  },

  async getReGenMealFastApi(params) {
    const response = await axios.get(
      "https://b56e-183-80-243-10.ngrok-free.app/regenerate_meal_day/",
      params
    );
    return response;
  },
};

export default mealService;
