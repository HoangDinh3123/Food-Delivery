import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [],
    promoCode: null,
    discount: 0
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
      return subtotal + deliveryFee + tax - state.discount
    }
  },
  
  actions: {
    addItem(item) {
      const existingItem = this.items.find(i => i.id === item.id)
      
      if (existingItem) {
        existingItem.quantity++
      } else {
        this.items.push({ ...item, quantity: 1 })
      }
    },
    
    removeItem(itemId) {
      const index = this.items.findIndex(i => i.id === itemId)
      if (index > -1) {
        this.items.splice(index, 1)
      }
    },
    
    updateQuantity(itemId, quantity) {
      const item = this.items.find(i => i.id === itemId)
      if (item && quantity > 0) {
        console.log(quantity)
        item.quantity = quantity
      }
    },
    
    applyPromoCode(code) {
      if (code === 'QUICKBITE20') {
        this.promoCode = code
        this.discount = this.subtotal * 0.2
        return true
      }
      return false
    },
    
    clearCart() {
      this.items = []
      this.promoCode = null
      this.discount = 0
    }
  }
})