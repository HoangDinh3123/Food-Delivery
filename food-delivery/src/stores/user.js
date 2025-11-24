import { defineStore } from 'pinia'
import { userAPI } from '@/services/api'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null,
    isAuthenticated: false,
    redirectPath: null
  }),
  
  getters: {
    userId: (state) => {
      return state.user ? state.user.userId : null
    },
    userName: (state) => {
      return state.user ? state.user.name : 'Guest'
    },
    userEmail: (state) => {
      return state.user ? state.user.email : ''
    },
  },
  
  actions: {
    async login(email, password) {
      try {
        const response = await userAPI.login(email, password)
        if (!response || response.error) {
          throw new Error(response ? response.error : 'Login failed')
        }

        this.user = response.user
        this.isAuthenticated = true
        // Save to localStorage
        localStorage.setItem('user', JSON.stringify(this.user))
        localStorage.setItem('isAuthenticated', 'true')

        return true
      } catch (error) {
        throw error
      }
    },
    
    async register(userData) {
      try {
        const response = await userAPI.register(userData)
        if (!response || response.error) {
          throw new Error(response ? response.error : 'Registration failed')
        }

        this.user = response.user
        this.isAuthenticated = true

        // Save to localStorage
        localStorage.setItem('user', JSON.stringify(this.user))
        localStorage.setItem('isAuthenticated', 'true')
        return true
      } catch (error) {
        throw error
      }
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