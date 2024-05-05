import api from "utils/api";

const accountService = {
  async getInformation() {
    const response = await api.get("/account");
    return response;
  },
};

export default accountService;
