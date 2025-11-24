<template>
  <!-- Login Modal -->
  <div 
    v-if="isOpen"
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
    @click.self="closeModal"
  >
    <div class="bg-white rounded-2xl max-w-md w-full p-8 relative">
      <button 
        @click="closeModal"
        class="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
      >
        <i class="fas fa-times text-2xl"></i>
      </button>

      <!-- Login Form -->
      <div v-if="!showRegister">
        <h2 class="text-3xl font-bold text-gray-800 mb-2">Welcome Back!</h2>
        <p class="text-gray-600 mb-6">Login to continue ordering</p>

        <form @submit.prevent="handleLogin">
          <div class="mb-4">
            <label class="block text-sm font-semibold text-gray-700 mb-2">Email</label>
            <input 
              v-model="loginForm.email"
              type="email" 
              required
              placeholder="your@email.com"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
            >
          </div>

          <div class="mb-6">
            <label class="block text-sm font-semibold text-gray-700 mb-2">Password</label>
            <input 
              v-model="loginForm.password"
              type="password" 
              required
              placeholder="••••••••"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
            >
          </div>

          <button 
            type="submit"
            class="w-full bg-red-600 text-white py-3 rounded-lg font-bold hover:bg-red-700 transition mb-4"
          >
            Login
          </button>

          <div class="text-center">
            <span class="text-gray-600">Don't have an account? </span>
            <button 
              type="button"
              @click="showRegister = true"
              class="text-red-600 font-semibold hover:underline"
            >
              Register
            </button>
          </div>
        </form>
      </div>

      <!-- Register Form -->
      <div v-else>
        <h2 class="text-3xl font-bold text-gray-800 mb-2">Create Account</h2>
        <p class="text-gray-600 mb-6">Join us and start ordering!</p>

        <form @submit.prevent="handleRegister">
          <div class="mb-4">
            <label class="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
            <input 
              v-model="registerForm.name"
              type="text" 
              required
              placeholder="John Doe"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
            >
          </div>

          <div class="mb-4">
            <label class="block text-sm font-semibold text-gray-700 mb-2">Email</label>
            <input 
              v-model="registerForm.email"
              type="email" 
              required
              placeholder="your@email.com"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
            >
          </div>

          <div class="mb-4">
            <label class="block text-sm font-semibold text-gray-700 mb-2">Phone</label>
            <input 
              v-model="registerForm.phone"
              type="tel" 
              placeholder="+1 (555) 123-4567"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
            >
          </div>

          <div class="mb-6">
            <label class="block text-sm font-semibold text-gray-700 mb-2">Password</label>
            <input 
              v-model="registerForm.password"
              type="password" 
              required
              placeholder="••••••••"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
            >
          </div>

          <button 
            type="submit"
            class="w-full bg-red-600 text-white py-3 rounded-lg font-bold hover:bg-red-700 transition mb-4"
          >
            Create Account
          </button>

          <div class="text-center">
            <span class="text-gray-600">Already have an account? </span>
            <button 
              type="button"
              @click="showRegister = false"
              class="text-red-600 font-semibold hover:underline"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['close'])

const router = useRouter()
const userStore = useUserStore()
const showRegister = ref(false)

const loginForm = ref({
  email: '',
  password: ''
})

const registerForm = ref({
  name: '',
  email: '',
  phone: '',
  password: ''
})

const closeModal = () => {
  emit('close')
  showRegister.value = false
  loginForm.value = { email: '', password: '' }
  registerForm.value = { name: '', email: '', phone: '', password: '' }
}

const handleLogin = async () => {
  try{
    const success = await userStore.login(loginForm.value.email, loginForm.value.password)
    if (success) {
      alert('Login successful!')
      closeModal()

      //redirect to saved path or home
      if (userStore.redirectPath) {
        router.push(userStore.redirectPath)
        useRouter.redirectPath = null
      }
    } else {
      alert('Invalid email or password')
    }
  } catch (error) {
    console.error('Login error:', error)
    alert('An error occurred during login. Please try again later.')
  }
}

const handleRegister = async () => {
  try {
    const success = await userStore.register({
      name: registerForm.value.name,
      email: registerForm.value.email,
      phone: registerForm.value.phone,
      password: registerForm.value.password
    })
    if (success) {
      alert('Registration successful! You can now log in.')
      showRegister.value = false
      registerForm.value = { name: '', email: '', phone: '', password: '' }
    } else {
      alert('Registration failed. Please try again.')
    }
  } catch (error) {
    console.error('Registration error:', error)
    alert('An error occurred during registration. Please try again later.')
  }
}
</script>