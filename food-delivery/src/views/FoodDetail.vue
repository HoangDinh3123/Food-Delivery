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
    </main>

    <Footer />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useCartStore } from '@/stores/cart'
import { useMenuStore } from '@/stores/menu'
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'

const route = useRoute()
const router = useRouter()
const cartStore = useCartStore()
const menuStore = useMenuStore()

// State
const quantity = ref(1)
const isFavorite = ref(false)
const mainImage = ref('')
const selectedSize = ref({})
const selectedAddons = ref([])

// Food Item Data (In real app, this would come from API/Store)
const foodItem = ref({})

onMounted(async () =>{
  const foodId = route.params.foodId
  try{
    foodItem.value = await menuStore.getMenuItemById(foodId)

    if(!foodItem.value){
      foodItem.value = await menuStore.fetchMenuItemById(foodId)
    }

    if(foodItem.value){
      mainImage.value = foodItem.value.images[0]
      selectedSize.value = foodItem.value.sizes[0]
    }
  } catch(error){
    console.error('Error fetching food item:', error)
  }
})


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
</script>