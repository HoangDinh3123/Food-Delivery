<template>
  <div class="bg-gray-50 min-h-screen">
    <Header />
    
    <main class="max-w-7xl mx-auto px-4 py-8">
      <!-- Page Header -->
      <div class="mb-8">
        <h1 class="text-4xl font-bold text-gray-800 mb-2">My Orders</h1>
        <p class="text-gray-600">Track your order history</p>
      </div>

      <!-- Filter Tabs -->
      <div class="bg-white rounded-xl shadow-sm p-2 mb-8 flex gap-2 overflow-x-auto">
        <button
          v-for="tab in filterTabs"
          :key="tab.value"
          @click="activeFilter = tab.value"
          :class="[
            'px-6 py-3 rounded-lg font-semibold whitespace-nowrap transition',
            activeFilter === tab.value
              ? 'bg-red-600 text-white'
              : 'text-gray-600 hover:bg-gray-100'
          ]"
        >
          {{ tab.label }}
          <span v-if="orderStore.countByStatus(tab.value) > 0" class="ml-2">
            ({{ orderStore.countByStatus(tab.value) }})
          </span>
        </button>
      </div>

      <!-- Empty State -->
      <div v-if="filteredOrders.length === 0" class="text-center py-16 bg-white rounded-2xl shadow-lg">
        <i class="fas fa-receipt text-8xl text-gray-300 mb-6"></i>
        <h2 class="text-3xl font-bold text-gray-800 mb-4">No Orders Found</h2>
        <p class="text-gray-600 mb-8">You haven't placed any orders yet</p>
        <button 
          @click="goToHome"
          class="bg-red-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-red-700 transition"
        >
          <i class="fas fa-utensils mr-2"></i>Start Ordering
        </button>
      </div>

      <!-- Orders List -->
      <div v-else class="space-y-6">
        <div
          v-for="order in filteredOrders"
          :key="order.id"
          class="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition"
        >
          <!-- Order Header -->
          <div class="bg-linear-to-r from-red-50 to-orange-50 p-6 border-b">
            <div class="flex flex-wrap items-center justify-between gap-4">
              <div>
                <div class="flex items-center gap-3 mb-2">
                  <h3 class="text-xl font-bold text-gray-800">Order #{{ order.id }}</h3>
                  <span :class="getStatusBadgeClass(order.status)">
                    <i :class="getStatusIcon(order.status) + ' mr-1'"></i>
                    {{ getStatusLabel(order.status) }}
                  </span>
                </div>
                <div class="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                  <span>
                    <i class="far fa-calendar mr-1"></i>
                    {{ formatDate(order.createdAt) }}
                  </span>
                  <span>
                    <i class="fas fa-box mr-1"></i>
                    {{ order.items.length }} items
                  </span>
                </div>
              </div>
              <div class="text-right">
                <div class="text-sm text-gray-600 mb-1">Total</div>
                <div class="text-3xl font-bold text-red-600">{{ formatPrice(order.total) }}</div>
              </div>
            </div>
          </div>

          <!-- Order Body -->
          <div class="p-6">
            <!-- Order Items -->
            <div class="mb-6">
              <h4 class="font-bold text-gray-800 mb-4">Items</h4>
              <div class="space-y-3">
                <div
                  v-for="item in order.items"
                  :key="item.id"
                  class="flex gap-4 p-3 bg-gray-50 rounded-lg"
                >
                  <img 
                    :src="item.image" 
                    :alt="item.name" 
                    class="w-16 h-16 rounded-lg object-cover"
                  >
                  <div class="flex-1">
                    <h5 class="font-bold text-gray-800">{{ item.name }}</h5>
                    <p class="text-sm text-gray-600">{{ item.size }} × {{ item.quantity }}</p>
                  </div>
                  <div class="text-right">
                    <div class="font-bold text-red-600">{{ formatPrice(item.price * item.quantity) }}</div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Delivery Info -->
            <div class="p-4 bg-gray-50 rounded-lg mb-6">
              <h4 class="font-bold text-gray-800 mb-3 flex items-center gap-2">
                <i class="fas fa-map-marker-alt text-red-600"></i>
                Delivery Address
              </h4>
              <p class="text-sm text-gray-600">
                {{ order.deliveryInfo.firstName }} {{ order.deliveryInfo.lastName }}<br>
                {{ order.deliveryInfo.address }}<br>
                {{ order.deliveryInfo.city }}, {{ order.deliveryInfo.state }} {{ order.deliveryInfo.zip }}<br>
                <i class="fas fa-phone text-red-600 mt-2"></i> {{ order.deliveryInfo.phone }}
              </p>
            </div>

            <!-- Action Buttons -->
            <div class="flex flex-wrap gap-3">
              <button 
                @click="reorder(order)"
                class="px-6 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition"
              >
                <i class="fas fa-redo mr-2"></i>Reorder
              </button>
              
              <button 
                class="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition"
              >
                <i class="fas fa-headset mr-2"></i>Help
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>

    <Footer />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '@/stores/cart'
import { useOrderStore } from '@/stores/order'
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'

const router = useRouter()
const cartStore = useCartStore()
const orderStore = useOrderStore()

// State
const activeFilter = ref('all')

const filterTabs = [
  { label: 'All Orders', value: 'all' },
  { label: 'Confirmed', value: 'confirmed' },
  { label: 'On the Way', value: 'on-the-way' },
  { label: 'Delivered', value: 'delivered' }
]


// Computed
const filteredOrders = computed(() => {
  return orderStore.ordersByStatus(activeFilter.value)
})

// Methods
const formatPrice = (price) => {
  return '$' + price.toFixed(2)
}

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  })
}

const getStatusLabel = (status) => {
  const labels = {
    'confirmed': 'Confirmed',
    'on-the-way': 'On the Way',
    'delivered': 'Delivered'
  }
  return labels[status]
}

const getStatusBadgeClass = (status) => {
  const classes = {
    'confirmed': 'bg-blue-100 text-blue-800',
    'on-the-way': 'bg-orange-100 text-orange-800',
    'delivered': 'bg-green-100 text-green-800'
  }
  return `${classes[status]} px-3 py-1 rounded-full text-sm font-semibold`
}

const getStatusIcon = (status) => {
  const icons = {
    'confirmed': 'fas fa-check-circle',
    'on-the-way': 'fas fa-truck',
    'delivered': 'fas fa-check-double'
  }
  return icons[status]
}

const reorder = (order) => {
  order.items.forEach(item => {
    cartStore.addItem(item)
  })
  alert('Items added to cart!')
  router.push('/cart')
}

const goToHome = () => {
  router.push('/')
}

// load orders when component mounts
onMounted(() => {
  orderStore.loadFromLocalStorage()
})
</script>