import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AuthView from '@/views/AuthView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'main',
      component: () => import('../App.vue') 
    },
    {
      path: '/auth',
      name: 'auth',
      component: () => import('../views/AuthView.vue') 
    },
    {
      path: '/bookshelf',
      name: 'bookshelf',
      component: () => import('../views/BookshelfView.vue')
    }
  ]
})

export default router
