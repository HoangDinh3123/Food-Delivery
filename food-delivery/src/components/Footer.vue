<template>
  <footer class="bg-gray-800 text-white py-12">
    <div class="max-w-7xl mx-auto px-4">
      <div class="grid md:grid-cols-4 gap-8 mb-8">
        <!-- Brand -->
        <div>
          <div class="flex items-center gap-2 mb-4">
            <i class="fas fa-burger text-2xl text-red-600"></i>
            <span class="text-xl font-bold">{{ appName }}</span>
          </div>
          <p class="text-gray-400">{{ tagline }}</p>
        </div>
        
        <!-- Quick Links -->
        <div>
          <h3 class="font-bold text-lg mb-4">Quick Links</h3>
          <ul class="space-y-2 text-gray-400">
            <li v-for="link in quickLinks" :key="link">
              <a href="#" class="hover:text-white transition">{{ link }}</a>
            </li>
          </ul>
        </div>
        
        <!-- Contact Info -->
        <div>
          <h3 class="font-bold text-lg mb-4">Contact Info</h3>
          <ul class="space-y-2 text-gray-400">
            <li><i class="fas fa-phone mr-2"></i>{{ phone }}</li>
            <li><i class="fas fa-envelope mr-2"></i>{{ email }}</li>
            <li><i class="fas fa-map-marker-alt mr-2"></i>{{ address }}</li>
          </ul>
        </div>
        
        <!-- Opening Hours -->
        <div>
          <h3 class="font-bold text-lg mb-4">Opening Hours</h3>
          <ul class="space-y-2 text-gray-400">
            <li v-for="hour in hours" :key="hour">{{ hour }}</li>
          </ul>
        </div>
      </div>
      
      <div class="border-t border-gray-700 pt-8 text-center text-gray-400">
        <p>&copy; 2024 {{ appName }}. All rights reserved.</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
    const appName = 'Group 6'
    const tagline = 'Delicious fast food delivered to your doorstep in no time!'
    const quickLinks = ['Menu', 'About Us', 'Contact', 'Careers']
    const phone = '+1 (xxx) 123-4567'
    const email = 'group6@dcmail.ca'
    const address = 'Durham College'
    const hours = ['Monday - Friday: 10am - 11pm', 'Saturday - Sunday: 9am - 12am']
</script>