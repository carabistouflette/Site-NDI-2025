import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MenuView from '../views/MenuView.vue'
import ChallengeView from '../views/ChallengeView.vue'
import ChallengeLayout from '../layouts/ChallengeLayout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/challenge',
      component: ChallengeLayout,
      children: [
        {
          path: '',
          name: 'menu',
          component: MenuView
        },
        {
          path: ':id',
          name: 'challenge',
          component: ChallengeView
        }
      ]
    }
  ]
})

export default router