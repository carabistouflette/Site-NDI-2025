<template>
  <div class="games-view">
    <n-layout>
      <n-layout-header>
        <AppHeader />
      </n-layout-header>
      
      <n-layout-content>
        <div class="games-container">
          <n-h1>Jeux de la Nuit de l'Informatique 2025</n-h1>
          <n-p>Découvrez notre sélection de jeux éducatifs et interactifs.</n-p>
          
          <n-grid cols="1 s:2 m:3 l:4" responsive="screen" :x-gap="16" :y-gap="16">
            <!-- Placeholder pour les cartes de jeux -->
            <n-grid-item v-for="i in 8" :key="i">
              <n-card>
                <template #header>
                  Jeu {{ i }}
                </template>
                <template #footer>
                  <n-button type="primary">Jouer</n-button>
                </template>
                Description du jeu {{ i }}
              </n-card>
            </n-grid-item>
          </n-grid>
        </div>
      </n-layout-content>
      
      <n-layout-footer>
        <AppFooter />
      </n-layout-footer>
    </n-layout>
  </div>
</template>

<script setup lang="ts">
import AppHeader from '@/components/layout/AppHeader.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
</script>

<style scoped>
.games-view {
  min-height: 100vh;
}

.games-container {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}
</style>