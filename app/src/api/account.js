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

  async uploadAvatar(file) {
    const form = new FormData();
    form.append("avatar", file);
    const response = await api.patch("/account/avatar", form);
    return response;
  },

  async changePassword(password, newPassword, confirmPassword) {
    const requestBody = {
      password: password,
      newPassword: newPassword,
      confirmPassword: confirmPassword,
    };
    const response = await api.patch("/account/password", requestBody);
    return response;
  },
};

export default accountService;
