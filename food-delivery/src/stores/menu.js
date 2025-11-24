import { defineStore } from "pinia";
import { menuAPI } from "@/services/api";

export const useMenuStore = defineStore("menu", {
  state: () => ({
    menuItems: [],
    currentItem : null,
    loading: false,
    error: null
  }),

  getters: {
    // Get all menu items
    allMenuItems: (state) => state.menuItems,
    // Get menu items by id
    getMenuItemById: (state) => (foodId) => {
      return state.menuItems.find((item) => item.foodId === foodId);
    }
  },
  actions: {
    // Fetch all menu items from the API
    async fetchMenuItems() {
      this.loading = true;
      this.error = null;
      try {
        const response = await menuAPI.getAllMenu();
        this.menuItems = response.items;
        return this.menuItems;
      } catch (error) {
        this.error = error.message || 'Failed to fetch menu items';
        throw error;
      } finally {
        this.loading = false;
      }
    },
    
    async fetchMenuItemById(foodId) {
      this.loading = true;
      this.error = null;
      try {
        const response = await menuAPI.getFoodById(foodId);
        this.currentItem = response.item;
        return this.currentItem;
      } catch (error) {
        this.error = error.message || 'Failed to fetch menu item';
        throw error;
      } finally {
        this.loading = false;
      }
    }
  }
}
)