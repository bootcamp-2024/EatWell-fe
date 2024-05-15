import api from "utils/api";

const accountService = {
  async getInformation() {
    const response = await api.get("/account");
    return response;
  },

  async updateInformation(data) {
    const response = await api.patch("/account", data);
    return response;
  },

  async updateUserPreferences(data) {
    const response = await api.patch("/account/update-preference", data);
    return response;
  },
};

export default accountService;
