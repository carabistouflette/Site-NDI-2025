import './assets/main.css'
import './assets/styles/variables.css'
import './assets/styles/nird-theme.css'
import './assets/styles/animations.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Tres from '@tresjs/core'

import App from './App.vue'
import router from './router'
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
app.use(Tres)

// Configuration du thème
app.provide('theme', nirdTheme)

app.mount('#app')
