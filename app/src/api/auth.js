import api from "utils/api";

const authApi = {
  async login(entity) {
    console.log(entity);
    const response = await api.post("/user/login", entity);
    return response;
  },

  async signup(entity) {
    const response = await api.post("/user/sign-up", entity);
    return response;
  },

  async verify(token) {
    const data = { token };
    const response = await api.post("/user/verify", data);
    return response;
  },

  async googleLogin(token) {
    const data = {
      tokenId: token,
    };
    const response = await api.post("/user/loginGoogle", data);
    return response;
  },
};

export default authApi;
