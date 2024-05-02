import api from "utils/api";

const authApi = {
  async login(email, password) {
    const data = { email, password };

    const response = await api.get("/user/login", data);
    return response;
  },

  async signup(entity) {
    const response = await api.post("/user/sign-up", entity);
    return response;
  },
};

export default authApi;
