<template>
  <div class="bg-gray-50 min-h-screen">
    <Header />
    
    <main class="max-w-7xl mx-auto px-4 py-8">
      <!-- Empty Cart State -->
      <div v-if="cartStore.items.length === 0" class="text-center py-16">
        <i class="fas fa-shopping-cart text-8xl text-gray-300 mb-6"></i>
        <h2 class="text-3xl font-bold text-gray-800 mb-4">Your Cart is Empty</h2>
        <p class="text-gray-600 mb-8">Add some delicious items to get started!</p>
        <button 
          @click="goToHome"
          class="bg-red-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-red-700 transition"
        >
          <i class="fas fa-utensils mr-2"></i>Browse Menu
        </button>
      </div>

      <!-- Cart with Items -->
      <div v-else class="grid lg:grid-cols-3 gap-8">
        <!-- Cart Items -->
        <div class="lg:col-span-2">
          <div class="bg-white rounded-2xl shadow-lg p-6 mb-6">
            <h2 class="text-2xl font-bold text-gray-800 mb-6">Your Cart</h2>

            <!-- Cart Item -->
            <div 
              v-for="(item, index) in cartStore.items"
              :key="item.id + '-' + index"
              :class="['flex gap-4 pb-6 mb-6', index < cartStore.items.length - 1 ? 'border-b border-gray-200' : '']"
            >
              <img 
                :src="item.image" 
                :alt="item.name" 
                class="w-24 h-24 rounded-lg object-cover"
              >
              <div class="flex-1">
                <div class="flex justify-between items-start mb-2">
                  <div>
                    <h3 class="font-bold text-lg text-gray-800">{{ item.name }}</h3>
                    <p class="text-sm text-gray-600">Size: {{ item.size }}</p>
                    <div v-if="item.addons && item.addons.length > 0" class="flex gap-2 mt-1">
                      <span 
                        v-for="addon in item.addons"
                        :key="addon"
                        class="text-xs bg-gray-100 px-2 py-1 rounded"
                      >
                        {{ addon }}
                      </span>
                    </div>
                  </div>
                  <button 
                    @click="removeItem(item.id)"
                    class="text-gray-400 hover:text-red-600 transition"
                  >
                    <i class="fas fa-times text-xl"></i>
                  </button>
                </div>
                <div class="flex items-center justify-between mt-4">
                  <div class="flex items-center gap-3">
                    <button 
                      @click="updateQuantity(item.id, item.quantity - 1)"
                      class="w-8 h-8 rounded-lg bg-gray-200 hover:bg-gray-300 font-bold"
                    >
                      -
                    </button>
                    <span class="font-bold w-6 text-center">{{ item.quantity }}</span>
                    <button 
                      @click="updateQuantity(item.id, item.quantity + 1)"
                      class="w-8 h-8 rounded-lg bg-gray-200 hover:bg-gray-300 font-bold"
                    >
                      +
                    </button>
                  </div>
                  <div class="text-right">
                    <div v-if="item.discount" class="text-sm text-gray-600 line-through">
                      {{ formatPrice(item.originalPrice * item.quantity) }}
                    </div>
                    <div class="text-xl font-bold text-red-600">
                      {{ formatPrice(item.price * item.quantity) }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Promo Code -->
          <div class="bg-white rounded-2xl shadow-lg p-6">
            <h3 class="font-bold text-lg text-gray-800 mb-4">Have a promo code?</h3>
            <div class="flex gap-3">
              <input 
                v-model="promoCode"
                type="text" 
                placeholder="Enter code" 
                class="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
              >
              <button 
                @click="applyPromoCode"
                class="bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition"
              >
                Apply
              </button>
            </div>

            <div v-if="cartStore.promoCode" class="mt-4 flex items-center justify-between bg-green-50 border border-green-200 rounded-lg p-3">
              <div class="flex items-center gap-2">
                <i class="fas fa-check-circle text-green-600"></i>
                <span class="text-sm font-semibold text-green-800">{{ cartStore.promoCode }} Applied</span>
              </div>
              <button 
                @click="removePromoCode"
                class="text-red-600 text-sm font-semibold hover:underline"
              >
                Remove
              </button>
            </div>

            <div v-else class="mt-4 flex items-center gap-2 text-sm text-gray-600">
              <i class="fas fa-tag text-red-600"></i>
              <span>Use code <span class="font-bold text-red-600">QUICKBITE20</span> for 20% off</span>
            </div>
          </div>
        </div>

        <!-- Order Summary -->
        <div class="lg:col-span-1">
          <div class="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
            <h2 class="text-2xl font-bold text-gray-800 mb-6">Order Summary</h2>

            <div class="space-y-4 mb-6">
              <div class="flex justify-between text-gray-600">
                <span>Subtotal ({{ cartStore.itemCount }} items)</span>
                <span class="font-semibold">{{ formatPrice(cartStore.subtotal) }}</span>
              </div>
              <div class="flex justify-between text-gray-600">
                <span>Delivery Fee</span>
                <span class="font-semibold">{{ formatPrice(deliveryFee) }}</span>
              </div>
              <div v-if="cartStore.discount > 0" class="flex justify-between text-green-600">
                <span>Discount</span>
                <span class="font-semibold">-{{ formatPrice(cartStore.discount) }}</span>
              </div>
              <div class="flex justify-between text-gray-600">
                <span>Tax (10%)</span>
                <span class="font-semibold">{{ formatPrice(tax) }}</span>
              </div>
            </div>

            <div class="border-t border-gray-200 pt-4 mb-6">
              <div class="flex justify-between items-center">
                <span class="text-xl font-bold text-gray-800">Total</span>
                <span class="text-3xl font-bold text-red-600">{{ formatPrice(total) }}</span>
              </div>
            </div>

            <button 
              @click="goToCheckout"
              class="w-full bg-red-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-red-700 transition shadow-lg mb-4"
            >
              <i class="fas fa-lock mr-2"></i>Proceed to Checkout
            </button>

            <button 
              @click="goToHome"
              class="w-full border-2 border-gray-300 text-gray-700 py-4 rounded-xl font-bold text-lg hover:bg-gray-50 transition"
            >
              <i class="fas fa-arrow-left mr-2"></i>Continue Shopping
            </button>

            <!-- Delivery Info -->
            <div class="mt-6 p-4 bg-gray-50 rounded-xl">
              <div class="flex items-start gap-3 mb-3">
                <i class="fas fa-truck text-red-600 mt-1"></i>
                <div>
                  <div class="font-semibold text-sm text-gray-800">Estimated Delivery</div>
                  <div class="text-sm text-gray-600">{{ estimatedDeliveryTime }}</div>
                </div>
              </div>
              <div class="flex items-start gap-3">
                <i class="fas fa-map-marker-alt text-red-600 mt-1"></i>
                <div>
                  <div class="font-semibold text-sm text-gray-800">Delivery Address</div>
                  <div class="text-sm text-gray-600">{{ deliveryAddress }}</div>
                  <button class="text-red-600 text-sm font-semibold mt-1 hover:underline">
                    Change
                  </button>
                </div>
              </div>
            </div>

            <!-- Payment Methods -->
            <div class="mt-6">
              <h3 class="font-bold text-sm text-gray-800 mb-3">Accepted Payment Methods</h3>
              <div class="flex gap-3">
                <div class="w-12 h-8 bg-gray-100 rounded flex items-center justify-center">
                  <i class="fab fa-cc-visa text-2xl text-blue-600"></i>
                </div>
                <div class="w-12 h-8 bg-gray-100 rounded flex items-center justify-center">
                  <i class="fab fa-cc-mastercard text-2xl text-red-600"></i>
                </div>
                <div class="w-12 h-8 bg-gray-100 rounded flex items-center justify-center">
                  <i class="fab fa-cc-paypal text-2xl text-blue-600"></i>
                </div>
                <div class="w-12 h-8 bg-gray-100 rounded flex items-center justify-center">
                  <i class="fab fa-cc-apple-pay text-2xl text-gray-800"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Add More Items -->
      <section v-if="cartStore.items.length > 0" class="mt-16">
        <h2 class="text-3xl font-bold text-gray-800 mb-8">Add More Items</h2>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div 
            v-for="item in suggestedItems"
            :key="item.id"
            class="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition cursor-pointer"
            @click="goToDetail(item.id)"
          >
            <img :src="item.image" :alt="item.name" class="w-full h-40 object-cover">
            <div class="p-4">
              <h3 class="font-bold mb-1">{{ item.name }}</h3>
              <div class="flex items-center justify-between">
                <div class="text-red-600 font-bold">{{ formatPrice(item.price) }}</div>
                <button 
                  @click.stop="quickAdd(item)"
                  class="bg-red-600 text-white px-3 py-1 rounded-lg text-sm hover:bg-red-700"
                >
                  <i class="fas fa-plus"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>

    <Footer />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '@/stores/cart'
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import { useUserStore } from '@/stores/user'

const router = useRouter()
const cartStore = useCartStore()
const userStore = useUserStore()

// State
const promoCode = ref('')
const deliveryAddress = ref('123 Main St, Downtown')
const estimatedDeliveryTime = ref('25-35 minutes')
const deliveryFee = ref(3.99)

// Suggested Items
const suggestedItems = ref([
  {
    id: 4,
    name: 'Spicy Wings',
    price: 9.99,
    image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=300&h=200&fit=crop'
  },
  {
    id: 6,
    name: 'Chocolate Shake',
    price: 5.99,
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300&h=200&fit=crop'
  },
  {
    id: 7,
    name: 'Chicken Nuggets',
    price: 6.99,
    image: 'https://images.unsplash.com/photo-1625869016774-3a92be2ae2cd?w=300&h=200&fit=crop'
  },
  {
    id: 8,
    name: 'Onion Rings',
    price: 4.99,
    image: 'https://images.unsplash.com/photo-1608039829572-78524f79c4c7?w=300&h=200&fit=crop'
  }
])

// Computed
const tax = computed(() => {
  return (cartStore.subtotal - cartStore.discount) * 0.1
})

const total = computed(() => {
  return cartStore.subtotal + deliveryFee.value + tax.value - cartStore.discount
})

// Methods
const formatPrice = (price) => {
  return '$' + price.toFixed(2)
}

const updateQuantity = (id, newQuantity) => {
  if (newQuantity < 1) 
    return
  cartStore.updateQuantity(id, newQuantity)
}

const removeItem = (index) => {
  if (confirm('Remove this item from cart?')) {
    cartStore.removeItem(index)
  }
}

const applyPromoCode = () => {
  const success = cartStore.applyPromoCode(promoCode.value.toUpperCase())
  if (success) {
    alert('Promo code applied successfully!')
  } else {
    alert('Invalid promo code')
  }
}

const removePromoCode = () => {
  cartStore.removePromoCode()
  promoCode.value = ''
}

const goToHome = () => {
  router.push('/')
}

const goToCheckout = () => {
  if (!userStore.isAuthenticated) {
    alert('Please login to proceed to checkout')
    router.push('/')
    return
  }  
  router.push('/checkout')
}

const goToDetail = (id) => {
  router.push(`/food/${id}`)
}

const quickAdd = (item) => {
  cartStore.addItem({
    ...item,
    size: 'Regular',
    addons: [],
    quantity: 1
  })
  alert(`${item.name} added to cart!`)
}
</script>