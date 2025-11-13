<template>
  <header class="bg-white shadow-sm sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 py-4">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-2">
          <i class="fas fa-burger text-3xl text-red-600"></i>
          <h1 class="text-2xl font-bold text-gray-800">{{ appName }}</h1>
        </div>
        
        <nav class="hidden md:flex items-center gap-8">
          <router-link 
            v-for="link in navLinks" 
            :key="link.name"
            :to="link.path"
            class="text-gray-700 hover:text-red-600 font-medium transition"
          >
            {{ link.name }}
          </router-link>
        </nav>

        <div class="flex items-center gap-4">
          <!-- Orders Button -->
          <button 
            @click="goToOrders"
            class="p-2 hover:bg-gray-100 rounded-full"
          >
            <i class="fas fa-receipt text-xl text-gray-700"></i>
          </button>

          <!-- Cart Button -->
          <button class="p-2 hover:bg-gray-100 rounded-full relative" @click="goToCart">
            <i class="fas fa-shopping-cart text-xl text-gray-700"></i>
            <span class="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {{ cartStore.itemCount }}
            </span>
          </button>

          <!-- User Menu (If logged in) -->
          <UserMenu 
            v-if="userStore.isAuthenticated"
            :is-open="showUserMenu"
            @toggle="toggleUserMenu"
            @close="showUserMenu = false"
          />

          <!-- Login Button (If not logged in) -->
          <button 
            v-else
            @click="openLoginModal"
            class="hidden md:block bg-red-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-red-700 transition"
          >
            <i class="fas fa-user mr-2"></i>Login
          </button>
          
          <!-- Mobile Menu -->
          <button class="md:hidden p-2 hover:bg-gray-100 rounded-full" @click="toggleMobileMenu">
            <i class="fas fa-bars text-xl text-gray-700"></i>
          </button>
        </div>
      </div>
    </div>

    <!-- Login Modal Component -->
    <LoginModal 
      :is-open="showLoginModal"
      @close="closeLoginModal"
    />
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useCartStore } from '@/stores/cart'
import { useRouter } from 'vue-router'

import { useUserStore } from '@/stores/user'
import LoginModal from './Auth/LoginModal.vue'
import UserMenu from './Auth/UserMenu.vue'

const router = useRouter()
const cartStore = useCartStore()
const userStore = useUserStore()

const appName = 'Group 6'
const showUserMenu = ref(false)
const showLoginModal = ref(false)

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Menu', path: '/#menu' },
  { name: 'My Orders', path: '/orders' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' }
]

const goToOrders = () => {
  router.push('orders')
  showUserMenu.value = false
}

const goToCart = () => {
  router.push('/cart')
}

const toggleUserMenu = () => {
  showUserMenu.value = !showUserMenu.value
}

const toggleMobileMenu = () => {
  alert('Mobile menu')
}

const openLoginModal = () => {
  showLoginModal.value = true
}

const closeLoginModal = () => {
  showLoginModal.value = false
}

// Close dropdown when clicking outside
const handleClickOutside = (event) => {
  if (showUserMenu.value && !event.target.closest('.relative')) {
    showUserMenu.value = false
  }
}

// Lifecycle
onMounted(() => {
  userStore.checkAuth()
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>