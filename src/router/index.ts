import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        title: 'Accueil - Nuit de l\'Informatique 2025'
      }
    },
    {
      path: '/games',
      name: 'games',
      component: () => import('@/views/GamesView.vue'),
      meta: {
        title: 'Jeux - Nuit de l\'Informatique 2025'
      }
    },
    {
      path: '/association',
      name: 'association',
      component: () => import('@/views/AssociationView.vue'),
      meta: {
        title: 'L\'Association NIRD - Nuit de l\'Informatique 2025'
      }
    },
    {
      path: '/contact',
      name: 'contact',
      component: HomeView,
      meta: {
        title: 'Contact - Nuit de l\'Informatique 2025'
      }
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

// Gestion du titre de la page
router.afterEach((to) => {
  if (to.meta.title) {
    document.title = to.meta.title as string
  }
})

export default router