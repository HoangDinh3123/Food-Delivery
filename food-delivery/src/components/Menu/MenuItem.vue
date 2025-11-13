<template>
  <div 
    class="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow cursor-pointer group"
    @click="goToDetail"
  >
    <div class="relative h-56 overflow-hidden">
      <img 
        :src="item.image" 
        :alt="item.name" 
        class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
      >
      <div 
        v-if="item.badge"
        :class="['absolute top-3 right-3 text-white px-3 py-1 rounded-full text-sm font-bold', item.badgeColor]"
      >
        {{ item.badge }}
      </div>
    </div>
    <div class="p-5">
      <h3 class="font-bold text-xl text-gray-800 mb-2">{{ item.name }}</h3>
      <p class="text-gray-600 text-sm mb-4">{{ item.description }}</p>
      <div class="flex items-center justify-between">
        <span class="text-2xl font-bold text-red-600">{{ formatPrice(item.price) }}</span>
        <button 
          @click.stop="addToCart"
          class="bg-red-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-700 transition"
        >
          <i class="fas fa-plus mr-2"></i>Add
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const props = defineProps({
  item: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['add-to-cart'])

const router = useRouter()

const formatPrice = (price) => {
  return '$' + price.toFixed(2)
}

const addToCart = () => {
  emit('add-to-cart', props.item)
}

const goToDetail = () => {
  router.push(`/food/${props.item.id}`)
}
</script>