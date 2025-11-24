import { defineStore } from 'pinia'
import { orderAPI } from '@/services/api'

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
    async fetchOrdersByUserId(userId) {
      try {
        const response = await orderAPI.getOrdersByUserId(userId)
        this.orders = response.orders || []
        return this.orders
      } catch (error) {
        console.error('Error fetching orders:', error)
        return []
      }
    },

    // Create new order
    async createOrder(orderData) {
      const newOrder = {
        userId: orderData.userId,
        items: orderData.items,
        deliveryInfo: orderData.deliveryInfo,
        paymentMethod: orderData.paymentMethod,
        subtotal: orderData.subtotal,
        deliveryFee: orderData.deliveryFee,
        tax: orderData.tax,
        total: orderData.total,
        status: 'confirmed',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
      
      const response = await orderAPI.createOrder(newOrder)
      // Add to beginning of array (newest first)
      this.orders.unshift(response.order)
      this.currentOrder = response.order
      
      return this.currentOrder
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
    
    
    // Clear all orders
    clearAllOrders() {
      this.orders = []
      this.currentOrder = null
    }
  }
})