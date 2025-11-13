import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null,
    isAuthenticated: false,
    redirectPath: null
  }),
  
  getters: {
    userName: (state) => {
      return state.user ? state.user.name : 'Guest'
    },
    userEmail: (state) => {
      return state.user ? state.user.email : ''
    }
  },
  
  actions: {
    login(email, password) {
      // Mock login
      if (email && password) {
        this.user = {
          id: 1,
          name: 'John Doe',
          email: email,
          phone: '+1 (555) 123-4567',
          address: '123 Main Street'
        }
        this.isAuthenticated = true
        
        // Save to localStorage
        localStorage.setItem('user', JSON.stringify(this.user))
        localStorage.setItem('isAuthenticated', 'true')
        
        return true
      }
      return false
    },
    
    register(userData) {
      // Mock register
      this.user = {
        id: Date.now(),
        name: userData.name,
        email: userData.email,
        phone: userData.phone || '',
        address: userData.address || ''
      }
      this.isAuthenticated = true
      
      // Save to localStorage
      localStorage.setItem('user', JSON.stringify(this.user))
      localStorage.setItem('isAuthenticated', 'true')
      
      return true
    },
    
    logout() {
      this.user = null
      this.isAuthenticated = false
      this.redirectPath = null
      
      // Clear localStorage
      localStorage.removeItem('user')
      localStorage.removeItem('isAuthenticated')
    },
    
    checkAuth() {
      // Check if user is logged in from localStorage
      const user = localStorage.getItem('user')
      const isAuth = localStorage.getItem('isAuthenticated')
      
      if (user && isAuth === 'true') {
        this.user = JSON.parse(user)
        this.isAuthenticated = true
      }
    },

    setRedirectPath(path) {
        this.redirectPath = path
    }
  }
})