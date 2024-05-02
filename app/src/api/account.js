import api from "utils/api";

const accountService = {
  async verify(token) {
    const data = { token };
    const response = await api.post("/user/verify", data);
    return response;
  },

  async getInformation() {
    const response = await api.get("/account");
    return response;
  },
};

export default accountService;
