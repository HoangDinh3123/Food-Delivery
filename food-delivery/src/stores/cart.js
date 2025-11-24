import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [],
  }),
  
  getters: {
    itemCount: (state) => {
      return state.items.reduce((total, item) => total + item.quantity, 0)
    },
    
    subtotal: (state) => {
      return state.items.reduce((total, item) => 
        total + (item.price * item.quantity), 0
      )
    },
    
    total: (state) => {
      const subtotal = state.items.reduce((total, item) => 
        total + (item.price * item.quantity), 0
      )
      const deliveryFee = 3.99
      const tax = subtotal * 0.1
      return subtotal + deliveryFee + tax
    }
  },
  
  actions: {
    addItem(item) {
      const existingItem = this.items.find(i => i.foodId === item.foodId)
      
      if (existingItem) {
        existingItem.quantity++
      } else {
        this.items.push({ ...item, quantity: 1 })
      }
    },
    
    removeItem(itemId) {
      const index = this.items.findIndex(i => i.itemId === itemId)
      if (index > -1) {
        this.items.splice(index, 1)
      }
    },
    
    updateQuantity(itemId, quantity) {
      const item = this.items.find(i => i.itemId === itemId)
      if (item && quantity > 0) {
        item.quantity = quantity
      }
    },
    
    clearCart() {
      this.items = []
    }
  }
})