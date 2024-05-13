import api from "utils/api";

const menuService = {
  async getAllMenus() {
    try {
      const response = await api.get("/menus");
      return response.data;
    } catch (error) {
      console.error("Error fetching menus:", error);
      throw error;
    }
  },

  async updateMenu(id, menuData) {
    try {
      const response = await api.put(`/menus/${id}`, menuData);
      return response.data;
    } catch (error) {
      console.error("Error updating menu:", error);
      throw error;
    }
  },

  async deleteMenu(id) {
    try {
      await api.delete(`/menus/${id}`);
    } catch (error) {
      console.error("Error deleting menu:", error);
      throw error;
    }
  },
  async createMenu(menuData) {
    try {
      const response = await api.post("/menus", menuData);
      return response.data;
    } catch (error) {
      console.error("Error creating menu:", error);
      throw error;
    }
  }
};

export default menuService;
