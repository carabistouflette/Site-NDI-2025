<template>
  <header class="app-header">
    <div class="app-header__container">
      <div class="app-header__logo">
        <img src="/src/assets/logo.svg" alt="Logo NIRD" class="logo" />
        <span class="logo-text">NIRD</span>
      </div>
      
      <nav class="app-header__navigation" :class="{ 'app-header__navigation--mobile': isMobileMenuOpen }">
        <n-menu
          mode="horizontal"
          :options="menuOptions"
          :value="activeRoute"
          @update:value="handleMenuClick"
        />
      </nav>
      
      <div class="app-header__actions">
        <NirdButton
          variant="digital"
          type="primary"
          @click="$router.push('/games')"
        >
          Accès aux jeux
        </NirdButton>
        <button
          class="mobile-menu-toggle"
          @click="toggleMobileMenu"
          aria-label="Toggle mobile menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path v-if="!isMobileMenuOpen" d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
            <path v-else d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
          </svg>
        </button>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { h } from 'vue'
import { RouterLink } from 'vue-router'
import { NMenu } from 'naive-ui'
import NirdButton from '@/components/common/NirdButton.vue'

const route = useRoute()
const router = useRouter()
const isMobileMenuOpen = ref(false)
const isMobile = ref(false)

const activeRoute = computed(() => {
  const path = route.path
  if (path === '/') return 'home'
  if (path.startsWith('/games')) return 'games'
  if (path.startsWith('/about')) return 'about'
  if (path.startsWith('/contact')) return 'contact'
  return 'home'
})

const menuOptions = [
  {
    label: () => h(RouterLink, { to: '/' }, { default: () => 'Accueil' }),
    key: 'home'
  },
  {
    label: () => h(RouterLink, { to: '/games' }, { default: () => 'Jeux' }),
    key: 'games'
  },
  {
    label: () => h(RouterLink, { to: '/about' }, { default: () => 'L\'association' }),
    key: 'about'
  },
  {
    label: () => h(RouterLink, { to: '/#nird' }, { default: () => 'Démarche NIRD' }),
    key: 'nird'
  }
]

const handleMenuClick = (key: string) => {
  if (key === 'home') {
    router.push('/')
  } else if (key === 'games') {
    router.push('/games')
  } else if (key === 'about') {
    router.push('/about')
  } else if (key === 'nird') {
    router.push('/#nird')
  }
  isMobileMenuOpen.value = false
}

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const checkMobile = () => {
  isMobile.value = window.innerWidth <= 768
  if (!isMobile.value) {
    isMobileMenuOpen.value = false
  }
}

onMounted(() => {
  checkMobile()
  window.addEventListener('resize', checkMobile)
})

onUnmounted(() => {
  window.removeEventListener('resize', checkMobile)
})
</script>

<style scoped>
.app-header {
  background: rgba(5, 5, 5, 0.9);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--border-color);
  position: sticky;
  top: 0;
  z-index: 100;
}

.app-header__container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 64px;
}

.app-header__logo {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
  font-size: 1.25rem;
  color: white;
}

.logo {
  height: 40px;
  width: auto;
}

.logo-text {
  background: var(--gradient-digital);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.app-header__navigation {
  flex: 1;
  max-width: 500px;
  margin: 0 2rem;
}

/* Override Naive UI Menu Styles for Dark Mode */
:deep(.n-menu-item-content-header a) {
  color: var(--text-secondary) !important;
}

:deep(.n-menu-item-content--selected .n-menu-item-content-header a),
:deep(.n-menu-item-content:hover .n-menu-item-content-header a) {
  color: var(--neon-green) !important;
}

:deep(.n-menu .n-menu-item-content .n-menu-item-content-header) {
  color: var(--text-secondary);
}

:deep(.n-menu .n-menu-item-content--selected .n-menu-item-content-header),
:deep(.n-menu .n-menu-item-content:hover .n-menu-item-content-header) {
  color: var(--neon-green);
}

.app-header__actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.mobile-menu-toggle {
  display: none;
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.mobile-menu-toggle:hover {
  background: rgba(57, 255, 20, 0.1);
  color: var(--neon-green);
}

@media (max-width: 768px) {
  .app-header__container {
    padding: 0 0.5rem;
  }
  
  .app-header__navigation {
    position: fixed;
    top: 64px;
    left: 0;
    right: 0;
    background: var(--bg-card);
    border-bottom: 1px solid var(--border-color);
    z-index: 99;
    transform: translateY(-100%);
    transition: transform 0.3s ease;
    opacity: 0;
    pointer-events: none;
  }
  
  .app-header__navigation--mobile {
    transform: translateY(0);
    opacity: 1;
    pointer-events: auto;
  }
  
  .app-header__navigation .n-menu {
    flex-direction: column;
    padding: 1rem;
  }
  
  .mobile-menu-toggle {
    display: block;
  }
  
  .app-header__actions {
    gap: 0.5rem;
  }
  
  .logo-text {
    display: none;
  }
}
</style>