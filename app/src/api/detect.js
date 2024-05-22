import axios from "axios";
import api from "utils/api";

const instance = axios.create({
  baseURL: "https://c890-115-79-4-48.ngrok-free.app",
  headers: {
    "ngrok-skip-browser-warning": "69420",
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});

const detectService = {
  async getGenMealDetectFastApi(recipeId) {
    const response = await instance.get(`/gen_recipes?imgID=${recipeId}`);
    return response;
  },
  async uploadDetectImage(file) {
    console.log(file);
    const formData = new FormData();
    formData.append("file", file);

    const response = await api.patch("/meal/detect", formData);

    return response.data;
  },
};

export default detectService;
