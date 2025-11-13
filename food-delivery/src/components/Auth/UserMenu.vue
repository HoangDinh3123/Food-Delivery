<template>
  <div class="relative">
    <button 
      @click="toggleMenu"
      class="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-full"
    >
      <div class="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center text-white font-bold">
        {{ initials }}
      </div>
      <i class="fas fa-chevron-down text-sm text-gray-600"></i>
    </button>

    <!-- Dropdown Menu -->
    <div 
      v-if="isOpen"
      class="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-lg py-2 border"
    >
      <div class="px-4 py-3 border-b">
        <div class="font-bold text-gray-800">{{ userName }}</div>
        <div class="text-sm text-gray-600">{{ userEmail }}</div>
      </div>
      
      <router-link 
        to="/orders" 
        class="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition"
        @click="closeMenu"
      >
        <i class="fas fa-receipt text-gray-600"></i>
        <span>My Orders</span>
      </router-link>
      
      <div class="border-t my-2"></div>
      
      <button 
        @click="handleLogout"
        class="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition text-red-600"
      >
        <i class="fas fa-sign-out-alt"></i>
        <span>Logout</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['toggle', 'close'])

const router = useRouter()
const userStore = useUserStore()

const userName = computed(() => userStore.userName)
const userEmail = computed(() => userStore.userEmail)

const initials = computed(() => {
  if (userStore.user && userStore.user.name) {
    const names = userStore.user.name.split(' ')
    if (names.length >= 2) {
      return names[0][0] + names[1][0]
    }
    return names[0][0]
  }
  return 'U'
})

const toggleMenu = () => {
  emit('toggle')
}

const closeMenu = () => {
  emit('close')
}

const handleLogout = () => {
  if (confirm('Are you sure you want to logout?')) {
    userStore.logout()
    closeMenu()
    router.push('/')
  }
}
</script>