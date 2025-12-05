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
    },
    {
      path: '/rpg/setup',
      name: 'rpg-setup',
      component: () => import('@/views/RpgSetupView.vue'),
      meta: { title: 'Eco Quest - Création de Profil' }
    },
    {
      path: '/rpg/play',
      name: 'rpg-play',
      component: () => import('@/views/RpgGameView.vue'),
      meta: { title: 'Eco Quest - L\'Aventure' }
    },
    {
      path: '/games/llm',
      name: 'llm-game',
      component: () => import('@/views/LLMGameView.vue'),
      meta: { title: 'Au Cœur du LLM - Simulation' }
    },
    {
      path: '/games/volume',
      name: 'volume-game',
      component: () => import('@/views/VolumeGameView.vue'),
      meta: { title: 'Samurai Volume - Challenge' }
    },
    {
      path: '/snake',
      name: 'snake',
      component: () => import('@/components/SnekSnek.vue'),
      meta: { title: 'Snake 3D - Secret Game' }
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