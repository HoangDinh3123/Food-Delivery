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

      <!-- Menu Items Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <MenuItem 
          v-for="item in filteredMenuItems"
          :key="item.id"
          :item="item"
          @add-to-cart="handleAddToCart"
        />
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '@/stores/cart'
import MenuItem from './MenuItem.vue'

const router = useRouter()
const cartStore = useCartStore()

const activeCategory = ref('all')

const categories = [
  { id: 'all', name: 'All Items' },
  { id: 'burgers', name: '🍔 Burgers' },
  { id: 'pizza', name: '🍕 Pizza' },
  { id: 'sides', name: '🍟 Sides' },
  { id: 'drinks', name: '🥤 Drinks' }
]

const menuItems = [
  {
    id: 1,
    name: 'Classic Burger',
    description: 'Juicy beef patty with fresh vegetables and special sauce',
    price: 8.99,
    category: 'burgers',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop',
    badge: 'Popular',
    badgeColor: 'bg-red-600'
  },
  {
    id: 2,
    name: 'Pepperoni Pizza',
    description: 'Hand-tossed pizza with premium pepperoni and cheese',
    price: 12.99,
    category: 'pizza',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=300&fit=crop',
    badge: null,
    badgeColor: ''
  },
  {
    id: 3,
    name: 'Crispy Fries',
    description: 'Golden crispy fries with special seasoning',
    price: 4.99,
    category: 'sides',
    image: 'https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=400&h=300&fit=crop',
    badge: 'New',
    badgeColor: 'bg-orange-500'
  },
  {
    id: 4,
    name: 'Spicy Wings',
    description: 'Crispy chicken wings with hot sauce',
    price: 9.99,
    category: 'sides',
    image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=400&h=300&fit=crop',
    badge: null,
    badgeColor: ''
  },
  {
    id: 5,
    name: 'Cheese Lovers',
    description: 'Four cheese blend on crispy crust',
    price: 11.99,
    category: 'pizza',
    image: 'https://images.unsplash.com/photo-1561758033-d89a9ad46330?w=400&h=300&fit=crop',
    badge: 'Popular',
    badgeColor: 'bg-red-600'
  },
  {
    id: 6,
    name: 'Chocolate Shake',
    description: 'Thick and creamy chocolate milkshake',
    price: 5.99,
    category: 'drinks',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop',
    badge: null,
    badgeColor: ''
  }
]

const filteredMenuItems = computed(() => {
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