<template>
  <div class="bg-gray-50 min-h-screen">
    <Header />
    
    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 py-8">
      <div class="grid lg:grid-cols-2 gap-12">
        <!-- Image Gallery -->
        <div>
          <div class="bg-white rounded-2xl overflow-hidden shadow-lg mb-4">
            <img 
              :src="mainImage" 
              :alt="foodItem.name" 
              class="w-full h-96 object-cover"
            >
          </div>
          <div class="grid grid-cols-4 gap-4">
            <img 
              v-for="(image, index) in foodItem.images"
              :key="index"
              :src="image" 
              @click="changeMainImage(image)"
              :class="[
                'w-full h-24 object-cover rounded-lg cursor-pointer border-2 transition',
                mainImage === image ? 'border-red-600' : 'border-gray-200 hover:border-red-600'
              ]"
            >
          </div>
        </div>

        <!-- Product Details -->
        <div>
          <div class="bg-white rounded-2xl p-8 shadow-lg">
            <!-- Badge and Title -->
            <div class="flex items-start justify-between mb-4">
              <div>
                <span 
                  v-if="foodItem.badge"
                  class="inline-block bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-semibold mb-3"
                >
                  <i class="fas fa-fire mr-1"></i>{{ foodItem.badge }}
                </span>
                <h1 class="text-4xl font-bold text-gray-800 mb-2">{{ foodItem.name }}</h1>
                <div class="flex items-center gap-4 mb-4">
                  <div class="flex items-center gap-1">
                    <i 
                      v-for="star in 5" 
                      :key="star"
                      :class="[
                        star <= Math.floor(foodItem.rating) ? 'fas fa-star' : 
                        star === Math.ceil(foodItem.rating) ? 'fas fa-star-half-alt' : 'far fa-star',
                        'text-yellow-400'
                      ]"
                    ></i>
                    <span class="text-gray-600 font-semibold ml-2">{{ foodItem.rating }}</span>
                    <span class="text-gray-400 ml-1">({{ foodItem.reviews }} reviews)</span>
                  </div>
                </div>
              </div>
              <button class="p-3 hover:bg-gray-100 rounded-full">
                <i :class="['text-2xl', isFavorite ? 'fas fa-heart text-red-600' : 'far fa-heart text-gray-400']"></i>
              </button>
            </div>

            <!-- Description -->
            <p class="text-gray-600 text-lg mb-6 leading-relaxed">
              {{ foodItem.description }}
            </p>

            <!-- Size Selection -->
            <div class="mb-6">
              <h3 class="text-xl font-bold text-gray-800 mb-3">Size</h3>
              <div class="grid grid-cols-3 gap-3">
                <button
                  v-for="size in foodItem.sizes"
                  :key="size.name"
                  @click="selectedSize = size"
                  :class="[
                    'border-2 rounded-lg p-3 transition',
                    selectedSize.name === size.name 
                      ? 'border-red-600 bg-red-50' 
                      : 'border-gray-200 hover:border-red-600'
                  ]"
                >
                  <div class="text-sm font-semibold">{{ size.name }}</div>
                  <div class="text-red-600 font-bold">{{ formatPrice(size.price) }}</div>
                </button>
              </div>
            </div>

            <!-- Quantity and Add to Cart -->
            <div class="border-t pt-6">
              <div class="flex items-center justify-between mb-6">
                <div>
                  <span class="text-gray-600 text-sm">Quantity</span>
                  <div class="flex items-center gap-4 mt-2">
                    <button 
                      @click="decreaseQuantity"
                      class="w-10 h-10 rounded-lg bg-gray-200 hover:bg-gray-300 font-bold text-xl"
                    >
                      -
                    </button>
                    <span class="text-2xl font-bold w-8 text-center">{{ quantity }}</span>
                    <button 
                      @click="increaseQuantity"
                      class="w-10 h-10 rounded-lg bg-gray-200 hover:bg-gray-300 font-bold text-xl"
                    >
                      +
                    </button>
                  </div>
                </div>
                <div class="text-right">
                  <span class="text-gray-600 text-sm">Total Price</span>
                  <div class="text-4xl font-bold text-red-600">{{ formatPrice(totalPrice) }}</div>
                </div>
              </div>
              <button 
                @click="addToCart"
                class="w-full bg-red-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-red-700 transition shadow-lg"
              >
                <i class="fas fa-shopping-cart mr-2"></i>Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Reviews Section -->
      <section class="mt-16">
        <h2 class="text-3xl font-bold text-gray-800 mb-8">Customer Reviews</h2>
        <div class="grid md:grid-cols-2 gap-6">
          <div 
            v-for="review in foodItem.customerReviews"
            :key="review.id"
            class="bg-white rounded-xl p-6 shadow"
          >
            <div class="flex items-start justify-between mb-4">
              <div class="flex items-center gap-3">
                <div :class="['w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg', review.avatarColor]">
                  {{ review.initials }}
                </div>
                <div>
                  <div class="font-bold">{{ review.name }}</div>
                  <div class="flex items-center gap-1">
                    <i 
                      v-for="star in 5" 
                      :key="star"
                      :class="[
                        star <= review.rating ? 'fas fa-star' : 'far fa-star',
                        'text-yellow-400 text-sm'
                      ]"
                    ></i>
                  </div>
                </div>
              </div>
              <span class="text-gray-400 text-sm">{{ review.date }}</span>
            </div>
            <p class="text-gray-600">{{ review.comment }}</p>
          </div>
        </div>
      </section>

      <!-- Related Products -->
      <section class="mt-16">
        <h2 class="text-3xl font-bold text-gray-800 mb-8">You Might Also Like</h2>
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div 
            v-for="item in relatedItems"
            :key="item.id"
            @click="goToDetail(item.id)"
            class="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition cursor-pointer"
          >
            <img :src="item.image" :alt="item.name" class="w-full h-40 object-cover">
            <div class="p-4">
              <h3 class="font-bold mb-1">{{ item.name }}</h3>
              <div class="text-red-600 font-bold">{{ formatPrice(item.price) }}</div>
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
import { useRoute, useRouter } from 'vue-router'
import { useCartStore } from '@/stores/cart'
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'

const route = useRoute()
const router = useRouter()
const cartStore = useCartStore()

// State
const quantity = ref(1)
const isFavorite = ref(false)
const mainImage = ref('')
const selectedSize = ref({})
const selectedAddons = ref([])

// Food Item Data (In real app, this would come from API/Store)
const foodItem = ref({
  id: 1,
  name: 'Classic Burger',
  description: 'Our signature Classic Burger features a juicy 100% beef patty, fresh lettuce, ripe tomatoes, crispy onions, pickles, and our special house sauce. All served on a toasted sesame seed bun.',
  rating: 4.8,
  reviews: 256,
  badge: 'Popular',
  prepTime: '15-20 min',
  calories: '650 kcal',
  protein: '35g',
  images: [
    'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&h=800&fit=crop',
    'https://images.unsplash.com/photo-1550547660-d9450f859349?w=200&h=200&fit=crop',
    'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=200&h=200&fit=crop',
    'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=200&h=200&fit=crop'
  ],
  sizes: [
    { name: 'Regular', price: 8.99 },
    { name: 'Large', price: 10.99 },
    { name: 'X-Large', price: 12.99 }
  ],
  addons: [
    { name: 'Extra Cheese', price: 1.50 },
    { name: 'Bacon', price: 2.00 },
    { name: 'Avocado', price: 1.99 }
  ],
  customerReviews: [
    {
      id: 1,
      name: 'John Doe',
      initials: 'JD',
      avatarColor: 'bg-red-600',
      rating: 5,
      date: '2 days ago',
      comment: 'Absolutely delicious! The burger was cooked to perfection and the ingredients were so fresh. Definitely my new favorite spot for burgers!'
    },
    {
      id: 2,
      name: 'Sarah Miller',
      initials: 'SM',
      avatarColor: 'bg-orange-600',
      rating: 4,
      date: '1 week ago',
      comment: 'Great burger but wish the bun was a bit more toasted. Overall very satisfied with the taste and portion size. Will order again!'
    }
  ]
})

const relatedItems = ref([
  {
    id: 3,
    name: 'Crispy Fries',
    price: 4.99,
    image: 'https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=300&h=200&fit=crop'
  },
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
  }
])

// Initialize
mainImage.value = foodItem.value.images[0]
selectedSize.value = foodItem.value.sizes[1] // Default to Large

// Computed
const totalPrice = computed(() => {
  let price = selectedSize.value.price
  
  // Add addons price
  selectedAddons.value.forEach(addon => {
    price += addon.price
  })
  
  return price * quantity.value
})

// Methods
const formatPrice = (price) => {
  return '$' + price.toFixed(2)
}

const changeMainImage = (image) => {
  mainImage.value = image
}

const increaseQuantity = () => {
  quantity.value++
}

const decreaseQuantity = () => {
  if (quantity.value > 1) {
    quantity.value--
  }
}

const addToCart = () => {
  const cartItem = {
    id: foodItem.value.id,
    name: foodItem.value.name,
    price: selectedSize.value.price,
    size: selectedSize.value.name,
    addons: selectedAddons.value.map(a => a.name),
    quantity: quantity.value,
    image: foodItem.value.images[0]
  }
  
  cartStore.addItem(cartItem)
  alert(`${cartItem.name} added to cart!`)
  router.push('/cart')
}

const goToDetail = (id) => {
  router.push(`/food/${id}`)
  window.scrollTo(0, 0)
}
</script>