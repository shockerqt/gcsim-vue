import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/simulator',
      name: 'simulator',
      component: () => import('../views/SimulatorView.vue')
    },
    {
      path: '/characters',
      name: 'characters',
      component: () => import('../views/CharactersView.vue'),
    },
    {
      path: '/characters/:character',
      name: 'character',
      component: () => import('../views/CharacterView.vue'),
    },
    {
      path: '/help',
      name: 'help',
      component: () => import('../views/HelpView.vue')
    }
  ]
})

export default router
