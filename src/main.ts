import './assets/main.css'
import './assets/styles/variables.css'
import './assets/styles/nird-theme.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'

import App from './App.vue'
import { nirdTheme } from './assets/styles/theme'

// Import Naive UI
import {
  create,
  NButton,
  NCard,
  NLayout,
  NLayoutHeader,
  NLayoutContent,
  NLayoutFooter,
  NMenu,
  NIcon,
  NText,
  NH1,
  NH2,
  NH3,
  NP,
  NGrid,
  NGridItem,
  NSpace,
  NDivider
} from 'naive-ui'

// Import des vues
import HomeView from './views/HomeView.vue'

// Configuration du router
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/games',
      name: 'games',
      component: () => import('./views/GamesView.vue')
    }
  ]
})

// Création de l'application avec Naive UI
const naive = create({
  components: [
    NButton,
    NCard,
    NLayout,
    NLayoutHeader,
    NLayoutContent,
    NLayoutFooter,
    NMenu,
    NIcon,
    NText,
    NH1,
    NH2,
    NH3,
    NP,
    NGrid,
    NGridItem,
    NSpace,
    NDivider
  ]
})

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(naive)

// Configuration du thème
app.provide('theme', nirdTheme)

app.mount('#app')
