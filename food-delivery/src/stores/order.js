import { defineStore } from 'pinia'

export const useOrderStore = defineStore('order', {
  state: () => ({
    orders: [],
    currentOrder: null
  }),
  
  getters: {
    // Get all orders
    allOrders: (state) => state.orders,
    
    // Get orders by status
    ordersByStatus: (state) => (status) => {
      if (status === 'all') 
        return state.orders
      return state.orders.filter(order => order.status === status)
    },
    
    // Get order by ID
    getOrderById: (state) => (orderId) => {
      return state.orders.find(order => order.id === orderId)
    },
    
    // Count orders by status
    countByStatus: (state) => (status) => {
      if (status === 'all') return state.orders.length
      return state.orders.filter(order => order.status === status).length
    },
    
    // Get latest order
    latestOrder: (state) => {
      if (state.orders.length === 0) return null
      return state.orders[0]
    }
  },
  
  actions: {
    // Create new order
    createOrder(orderData) {
      const newOrder = {
        id: 'ORD-' + Date.now(),
        items: orderData.items,
        deliveryInfo: orderData.deliveryInfo,
        paymentMethod: orderData.paymentMethod,
        subtotal: orderData.subtotal,
        discount: orderData.discount || 0,
        deliveryFee: orderData.deliveryFee,
        tax: orderData.tax,
        total: orderData.total,
        status: 'confirmed',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
      
      // Add to beginning of array (newest first)
      this.orders.unshift(newOrder)
      this.currentOrder = newOrder
      
      // Save to localStorage
      this.saveToLocalStorage()
      
      return newOrder
    },
    
    // Update order status
    updateOrderStatus(orderId, newStatus) {
      const order = this.orders.find(o => o.id === orderId)
      if (order) {
        order.status = newStatus
        order.updatedAt = new Date().toISOString()
        this.saveToLocalStorage()
        return true
      }
      return false
    },
    
    // Cancel order
    cancelOrder(orderId) {
      return this.updateOrderStatus(orderId, 'cancelled')
    },
    
    // Delete order
    deleteOrder(orderId) {
      const index = this.orders.findIndex(o => o.id === orderId)
      if (index > -1) {
        this.orders.splice(index, 1)
        this.saveToLocalStorage()
        return true
      }
      return false
    },
    
    // Load orders from localStorage
    loadFromLocalStorage() {
      const savedOrders = localStorage.getItem('orders')
      if (savedOrders) {
        try {
          this.orders = JSON.parse(savedOrders)
        } catch (error) {
          console.error('Error loading orders:', error)
          this.orders = []
        }
      }
    },
    
    // Save orders to localStorage
    saveToLocalStorage() {
      try {
        localStorage.setItem('orders', JSON.stringify(this.orders))
      } catch (error) {
        console.error('Error saving orders:', error)
      }
    },
    
    // Clear all orders
    clearAllOrders() {
      this.orders = []
      this.currentOrder = null
      localStorage.removeItem('orders')
    }
  }
})