<template>
  <section id="menu" class="py-16 bg-gray-50">
    <div class="max-w-7xl mx-auto px-4">
      <div class="text-center mb-12">
        <h2 class="text-4xl font-bold text-gray-800 mb-4">Our Menu</h2>
        <p class="text-xl text-gray-600">Choose from our delicious selection</p>
      </div>

      <!-- Category Filter -->
      <div class="flex gap-4 mb-8 overflow-x-auto pb-2">
        <button
          v-for="category in categories"
          :key="category.id"
          @click="activeCategory = category.id"
          :class="[
            'px-6 py-3 rounded-full whitespace-nowrap transition-all font-medium',
            activeCategory === category.id
              ? 'bg-red-600 text-white shadow-lg'
              : 'bg-white text-gray-700 hover:bg-gray-100'
          ]"
        >
          {{ category.name }}
        </button>
      </div>

      <!-- Error State -->
      <div v-if="error" class="text-center py-12">
        <p class="text-red-600 text-lg">{{ error }}</p>
        <button 
          @click="onMounted"
          class="mt-4 px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition"
        >
          Retry
        </button>
      </div>

      <!-- Loading State -->
      <div v-else-if="loading" class="text-center py-12">
        <div class="inline-block animate-spin rounded-full h-12 w-12 border-4 border-orange-500 border-t-transparent"></div>
        <p class="mt-4 text-gray-600">Loading menu...</p>
      </div>

      <!-- Menu Items Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <MenuItem 
          v-for="item in filteredMenuItems"
          :key="item.foodId"
          :item="item"
          @add-to-cart="handleAddToCart"
        />
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '@/stores/cart'
import { useMenuStore } from '@/stores/menu'
import MenuItem from './MenuItem.vue'


const router = useRouter()
const cartStore = useCartStore()
const menuStore = useMenuStore()

const activeCategory = ref('all')
const loading = ref(false)
const error = ref(null)

const categories = [
  { id: 'all', name: 'All Items' },
  { id: 'burgers', name: '🍔 Burgers' },
  { id: 'pizza', name: '🍕 Pizza' },
  { id: 'sides', name: '🍟 Sides' },
  { id: 'drinks', name: '🥤 Drinks' }
]

onMounted(async () => {
  loading.value = true
  error.value = null
  try {
    await menuStore.fetchMenuItems()
  } catch (err) {
    error.value = 'Failed to load menu items.'
  } finally {
    loading.value = false
  } 
})


const filteredMenuItems = computed(() => {
  let menuItems = menuStore.allMenuItems
  if (activeCategory.value === 'all') {
    return menuItems
  }
  return menuItems.filter(item => item.category === activeCategory.value)
})

const handleAddToCart = (item) => {
  cartStore.addItem(item)
  // Show notification
  alert(`${item.name} added to cart!`)
}
</script>