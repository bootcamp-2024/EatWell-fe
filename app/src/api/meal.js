import api from "utils/api";

const mealService = {
  async getIngredientNames() {
    const response = await api.get("/meal/getIngredients");
    return response;
  },
};

export default mealService;
