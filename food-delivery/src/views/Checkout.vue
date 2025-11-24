<template>
  <div class="bg-gray-50 min-h-screen">
    <Header />

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 py-8">
      <div class="grid lg:grid-cols-3 gap-8">
        <!-- Left Column - Forms -->
        <div class="lg:col-span-2 space-y-6">
          
          <!-- Delivery Information -->
          <div class="bg-white rounded-2xl shadow-lg p-6">
            <div class="flex items-center justify-between mb-6">
              <h2 class="text-2xl font-bold text-gray-800">Delivery Information</h2>
              <span class="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-semibold">Required</span>
            </div>

            <form class="space-y-4">
              <div class="grid md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-semibold text-gray-700 mb-2">First Name</label>
                  <input 
                    v-model="deliveryInfo.firstName"
                    type="text" 
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                  >
                </div>
                <div>
                  <label class="block text-sm font-semibold text-gray-700 mb-2">Last Name</label>
                  <input 
                    v-model="deliveryInfo.lastName"
                    type="text" 
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                  >
                </div>
              </div>

              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
                <input 
                  v-model="deliveryInfo.phone"
                  type="tel" 
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                >
              </div>

              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">Street Address</label>
                <input 
                  v-model="deliveryInfo.address"
                  type="text" 
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                >
              </div>

              <div class="grid md:grid-cols-3 gap-4">
                <div>
                  <label class="block text-sm font-semibold text-gray-700 mb-2">City</label>
                  <input 
                    v-model="deliveryInfo.city"
                    type="text" 
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                  >
                </div>
                <div>
                  <label class="block text-sm font-semibold text-gray-700 mb-2">State</label>
                  <select 
                    v-model="deliveryInfo.state"
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                  >
                    <option value="CA">CA</option>
                    <option value="NY">NY</option>
                    <option value="TX">TX</option>
                    <option value="FL">FL</option>
                  </select>
                </div>
                <div>
                  <label class="block text-sm font-semibold text-gray-700 mb-2">ZIP Code</label>
                  <input 
                    v-model="deliveryInfo.zip"
                    type="text" 
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                  >
                </div>
              </div>

              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">Delivery Instructions (Optional)</label>
                <textarea 
                  v-model="deliveryInfo.instructions"
                  rows="3" 
                  placeholder="e.g., Ring the doorbell twice, Leave at front door..." 
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                ></textarea>
              </div>
            </form>
          </div>

          <!-- Payment Method -->
          <div class="bg-white rounded-2xl shadow-lg p-6">
            <h2 class="text-2xl font-bold text-gray-800 mb-6">Payment Method</h2>

            <div class="space-y-4">
              <!-- Credit Card -->
              <label 
                :class="[
                  'border-2 rounded-xl p-4 cursor-pointer transition block',
                  paymentMethod === 'card' ? 'border-red-600 bg-red-50' : 'border-gray-200 hover:border-red-600'
                ]"
              >
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-3">
                    <input 
                      type="radio" 
                      v-model="paymentMethod"
                      value="card"
                      class="w-5 h-5 text-red-600"
                    >
                    <i class="fas fa-credit-card text-2xl text-red-600"></i>
                    <span class="font-bold text-gray-800">Credit / Debit Card</span>
                  </div>
                  <div class="flex gap-2">
                    <i class="fab fa-cc-visa text-2xl text-blue-600"></i>
                    <i class="fab fa-cc-mastercard text-2xl text-red-600"></i>
                  </div>
                </div>
              </label>

              <!-- Card Details Form -->
              <div v-if="paymentMethod === 'card'" class="pl-4 space-y-4 mt-4">
                <div>
                  <label class="block text-sm font-semibold text-gray-700 mb-2">Card Number</label>
                  <input 
                    v-model="cardInfo.number"
                    type="text" 
                    placeholder="1234 5678 9012 3456" 
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                  >
                </div>
                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-2">Expiry Date</label>
                    <input 
                      v-model="cardInfo.expiry"
                      type="text" 
                      placeholder="MM/YY" 
                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                    >
                  </div>
                  <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-2">CVV</label>
                    <input 
                      v-model="cardInfo.cvv"
                      type="text" 
                      placeholder="123" 
                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                    >
                  </div>
                </div>
              </div>

              <!-- PayPal -->
              <label 
                :class="[
                  'border-2 rounded-xl p-4 cursor-pointer transition block',
                  paymentMethod === 'paypal' ? 'border-red-600 bg-red-50' : 'border-gray-200 hover:border-red-600'
                ]"
              >
                <div class="flex items-center gap-3">
                  <input 
                    type="radio" 
                    v-model="paymentMethod"
                    value="paypal"
                    class="w-5 h-5 text-red-600"
                  >
                  <i class="fab fa-paypal text-2xl text-blue-600"></i>
                  <span class="font-bold text-gray-800">PayPal</span>
                </div>
              </label>

              <!-- Cash on Delivery -->
              <label 
                :class="[
                  'border-2 rounded-xl p-4 cursor-pointer transition block',
                  paymentMethod === 'cash' ? 'border-red-600 bg-red-50' : 'border-gray-200 hover:border-red-600'
                ]"
              >
                <div class="flex items-center gap-3">
                  <input 
                    type="radio" 
                    v-model="paymentMethod"
                    value="cash"
                    class="w-5 h-5 text-red-600"
                  >
                  <i class="fas fa-money-bill-wave text-2xl text-green-600"></i>
                  <span class="font-bold text-gray-800">Cash on Delivery</span>
                </div>
              </label>
            </div>
          </div>

          <!-- Special Instructions -->
          <div class="bg-white rounded-2xl shadow-lg p-6">
            <h2 class="text-2xl font-bold text-gray-800 mb-4">Additional Notes</h2>
            <textarea 
              v-model="additionalNotes"
              rows="4" 
              placeholder="Any special requests or dietary restrictions..." 
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
            ></textarea>
          </div>
        </div>

        <!-- Right Column - Order Summary -->
        <div class="lg:col-span-1">
          <div class="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
            <h2 class="text-2xl font-bold text-gray-800 mb-6">Order Summary</h2>

            <!-- Items -->
            <div class="space-y-4 mb-6">
              <div 
                v-for="item in cartStore.items"
                :key="item.id"
                class="flex gap-3"
              >
                <img 
                  :src="item.images?.[0] || 'https://via.placeholder.com/300x200'"
                  :alt="item.name" 
                  class="w-16 h-16 rounded-lg object-cover"
                >
                <div class="flex-1">
                  <div class="font-bold text-sm">{{ item.name }}</div>
                  <div class="text-xs text-gray-600">{{ item.size }} × {{ item.quantity }}</div>
                  <div class="text-sm font-bold text-red-600">{{ formatPrice(item.price * item.quantity) }}</div>
                </div>
              </div>
            </div>

            <!-- Promo Applied -->
            <div 
              v-if="cartStore.promoCode"
              class="bg-green-50 border border-green-200 rounded-lg p-3 mb-6 flex items-center justify-between"
            >
              <div class="flex items-center gap-2">
                <i class="fas fa-check-circle text-green-600"></i>
                <span class="text-sm font-semibold text-green-800">{{ cartStore.promoCode }} Applied</span>
              </div>
              <button 
                @click="cartStore.removePromoCode()"
                class="text-red-600 text-sm font-semibold hover:underline"
              >
                Remove
              </button>
            </div>

            <!-- Price Breakdown -->
            <div class="space-y-3 mb-6 pb-6 border-b">
              <div class="flex justify-between text-gray-600">
                <span>Subtotal ({{ cartStore.itemCount }} items)</span>
                <span class="font-semibold">{{ formatPrice(cartStore.subtotal) }}</span>
              </div>
              <div class="flex justify-between text-gray-600">
                <span>Delivery Fee</span>
                <span class="font-semibold">{{ formatPrice(deliveryFee) }}</span>
              </div>
              <div class="flex justify-between text-gray-600">
                <span>Tax (10%)</span>
                <span class="font-semibold">{{ formatPrice(tax) }}</span>
              </div>
            </div>

            <!-- Total -->
            <div class="flex justify-between items-center mb-6">
              <span class="text-xl font-bold text-gray-800">Total</span>
              <span class="text-3xl font-bold text-red-600">{{ formatPrice(total) }}</span>
            </div>

            <!-- Place Order Button -->
            <button 
              @click="placeOrder"
              :disabled="!isFormValid"
              :class="[
                'w-full py-4 rounded-xl font-bold text-lg transition shadow-lg mb-4',
                isFormValid 
                  ? 'bg-red-600 text-white hover:bg-red-700 cursor-pointer' 
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              ]"
            >
              <i class="fas fa-check-circle mr-2"></i>Place Order
            </button>

            <!-- Terms -->
            <p class="text-xs text-gray-600 text-center">
              By placing your order, you agree to our 
              <a href="#" class="text-red-600 hover:underline">Terms & Conditions</a> and 
              <a href="#" class="text-red-600 hover:underline">Privacy Policy</a>
            </p>

            <!-- Security Badge -->
            <div class="mt-6 p-4 bg-gray-50 rounded-xl text-center">
              <i class="fas fa-shield-alt text-3xl text-green-600 mb-2"></i>
              <div class="font-bold text-sm text-gray-800">Secure Payment</div>
              <div class="text-xs text-gray-600">Your information is protected with SSL encryption</div>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- Footer Trust Badges -->
    <section class="bg-white border-t mt-12 py-8">
      <div class="max-w-7xl mx-auto px-4">
        <div class="grid md:grid-cols-4 gap-6 text-center">
          <div>
            <i class="fas fa-truck text-3xl text-red-600 mb-2"></i>
            <div class="font-bold text-sm">Fast Delivery</div>
            <div class="text-xs text-gray-600">25-35 minutes</div>
          </div>
          <div>
            <i class="fas fa-lock text-3xl text-green-600 mb-2"></i>
            <div class="font-bold text-sm">Secure Payment</div>
            <div class="text-xs text-gray-600">SSL Encrypted</div>
          </div>
          <div>
            <i class="fas fa-undo text-3xl text-blue-600 mb-2"></i>
            <div class="font-bold text-sm">Money Back</div>
            <div class="text-xs text-gray-600">100% Guarantee</div>
          </div>
          <div>
            <i class="fas fa-headset text-3xl text-purple-600 mb-2"></i>
            <div class="font-bold text-sm">24/7 Support</div>
            <div class="text-xs text-gray-600">Always Available</div>
          </div>
        </div>
      </div>
    </section>

    <Footer />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '@/stores/cart'
import { useOrderStore } from '@/stores/order'
import { useUserStore } from '@/stores/user'
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'

const router = useRouter()
const cartStore = useCartStore()
const orderStore = useOrderStore()
const userStore = useUserStore()

// State
const deliveryInfo = ref({
  firstName: '',
  lastName: '',
  phone: '',
  address: '',
  city: '',
  state: '',
  zip: '',
  instructions: ''
})


const paymentMethod = ref('card')
const cardInfo = ref({
  number: '',
  expiry: '',
  cvv: ''
})

const additionalNotes = ref('')
const deliveryFee = ref(3.99)

//user id
const userId = computed(() => userStore.userId)

// Computed
const tax = computed(() => {
  return cartStore.subtotal * 0.1
})

const total = computed(() => {
  return cartStore.subtotal + deliveryFee.value + tax.value
})

const isFormValid = computed(() => {
  const hasDeliveryInfo = deliveryInfo.value.firstName && 
                          deliveryInfo.value.lastName && 
                          deliveryInfo.value.phone && 
                          deliveryInfo.value.address &&
                          deliveryInfo.value.city &&
                          deliveryInfo.value.zip

  const hasPaymentInfo = paymentMethod.value === 'cash' || 
                         paymentMethod.value === 'paypal' ||
                         (paymentMethod.value === 'card' && cardInfo.value.number && cardInfo.value.expiry && cardInfo.value.cvv)

  return hasDeliveryInfo && hasPaymentInfo && cartStore.items.length > 0
})

// Methods
const formatPrice = (price) => {
  return '$' + price.toFixed(2)
}

const placeOrder = () => {
  if (!isFormValid.value) {
    alert('Please fill in all required fields')
    return
  }

  // Create order object
  const orderData = {
    userId: userId.value,
    items: cartStore.items,
    deliveryInfo: deliveryInfo.value,
    paymentMethod: paymentMethod.value,
    subtotal: cartStore.subtotal,
    deliveryFee: deliveryFee.value,
    tax: tax.value,
    total: total.value
  }

  orderStore.createOrder(orderData)

  // Clear cart
  cartStore.clearCart()

  // Redirect to success page
  alert('Order placed successfully')
  router.push('/')
}
</script>