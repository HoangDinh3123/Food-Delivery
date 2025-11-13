import Home from '@/views/Home.vue'
import FoodDetail from '@/views/FoodDetail.vue'
import Cart from '@/views/Cart.vue'
import Checkout from '@/views/Checkout.vue'
import Orders from '@/views/Orders.vue'
import { useUserStore } from '@/stores/user'

import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },

  {
    path: '/food/:id',
    name: 'FoodDetail',
    component: FoodDetail
  },

  {
    path: '/cart',
    name: 'Cart',
    component: Cart
  },

  {
    path: '/checkout',
    name: 'Checkout',
    component: Checkout,
    meta: {requiresAuth: true}
  },

  {
    path: '/orders',
    name: 'My Orders',
    component: Orders,
    meta: {requiresAuth: true}
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if(savedPosition) {
      return savedPosition
    } else {
      return {top: 0}
    }
  }
})

//Check Authentication
router.beforeEach((to, from, next) => {
  const userStore = useUserStore()

  //Check if user is authenticated from local storage
  userStore.checkAuth()

  //check if current route requires auth
  if (to.meta.requiresAuth && !userStore.isAuthenticated) {
    //save redirect path
    userStore.setRedirectPath(to.fullPath)
    //not logged in, redirect to home
    alert('Please login to access this page')
    next({name: 'Home'})
  }
  else {
    next()
  }
})

export default router
