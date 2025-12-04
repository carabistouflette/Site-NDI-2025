<template>
  <header class="app-header">
    <div class="app-header__container">
      <div class="app-header__logo">
        <img src="/src/assets/logo.svg" alt="Logo NIRD" class="logo" />
        <span class="logo-text">NIRD</span>
      </div>
      
      <nav class="app-header__navigation">
        <n-menu mode="horizontal" :options="menuOptions" />
      </nav>
      
      <div class="app-header__actions">
        <NirdButton 
          variant="digital" 
          type="primary"
          @click="$router.push('/games')"
        >
          Accès aux jeux
        </NirdButton>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { h } from 'vue'
import { RouterLink } from 'vue-router'
import { NMenu } from 'naive-ui'
import NirdButton from '@/components/common/NirdButton.vue'


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
    label: 'À propos',
    key: 'about',
    children: [
      {
        label: 'L\'association NIRD',
        key: 'association'
      },
      {
        label: 'La Nuit de l\'Informatique',
        key: 'event'
      }
    ]
  },
  {
    label: 'Contact',
    key: 'contact'
  }
]
</script>

<style scoped>
.app-header {
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
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
  color: var(--nird-anthracite);
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

.app-header__actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}

@media (max-width: 768px) {
  .app-header__container {
    padding: 0 0.5rem;
  }
  
  .app-header__navigation {
    display: none;
  }
  
  .app-header__actions {
    gap: 0.5rem;
  }
  
  .logo-text {
    display: none;
  }
}
</style>