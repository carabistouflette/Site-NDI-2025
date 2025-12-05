<template>
  <div class="home-view">
    <main>
      <HeroSection />
      <GamePreview />
      <NirdPresentation />
    </main>
    
    <footer>
      <AppFooter />
    </footer>
  </div>
</template>

<script setup lang="ts">
import AppFooter from '@/components/layout/AppFooter.vue'
import HeroSection from '@/components/home/HeroSection.vue'
import GamePreview from '@/components/home/GamePreview.vue'
import NirdPresentation from '@/components/home/NirdPresentation.vue'
</script>

<style scoped>
.home-view {
  min-height: 100vh;
  background: var(--bg-dark);
}
</style>
