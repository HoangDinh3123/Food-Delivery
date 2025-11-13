<template>
  <section class="py-16 bg-linear-to-r from-orange-500 to-red-600 text-white">
    <div class="max-w-7xl mx-auto px-4 text-center">
      <h2 class="text-4xl font-bold mb-4">{{ title }}</h2>
      <p class="text-2xl mb-8">{{ description }}</p>
      <p class="text-lg mb-8 opacity-90">
        Use code: <span class="font-bold text-2xl">{{ code }}</span>
      </p>
      <button class="bg-white text-red-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition shadow-lg">
        Order Now & Save
      </button>
    </div>
  </section>
</template>

<script setup>
const title = 'Special Offer!'
const description = 'Get 20% OFF on orders above $30'
const code = 'QUICKBITE20'
</script>