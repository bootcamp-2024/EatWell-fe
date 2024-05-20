import api from "utils/api";

const menuService = {
  // Fetch all menus
  async getAllMenus() {
    try {
      const response = await api.get("/menus");
      return response.data;
    } catch (error) {
      console.error("Error fetching menus:", error);
      throw error; // Rethrow the error for higher-level error handling
    }
  },

  // Update an existing menu by ID
  async updateMenu(id, menuData) {
    try {
      const response = await api.put(`/menus/${id}`, menuData);
      return response.data;
    } catch (error) {
      console.error(`Error updating menu with ID ${id}:`, error);
      throw error; // Rethrow the error for higher-level error handling
    }
  },

  // Delete a menu by ID
  async deleteMenu(id) {
    try {
      await api.delete(`/menus/${id}`);
    } catch (error) {
      console.error(`Error deleting menu with ID ${id}:`, error);
      throw error; // Rethrow the error for higher-level error handling
    }
  },
};

export default menuService;
