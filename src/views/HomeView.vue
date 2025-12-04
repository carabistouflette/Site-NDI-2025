<template>
  <div class="home-view">
    <n-layout>
      <n-layout-header>
        <AppHeader />
      </n-layout-header>
      
      <n-layout-content>
        <HeroSection />
        <GamePreview />
        <JoinUs />
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
import HeroSection from '@/components/home/HeroSection.vue'
import GamePreview from '@/components/home/GamePreview.vue'
import JoinUs from '@/components/home/JoinUs.vue'
</script>

<style scoped>
.home-view {
  min-height: 100vh;
  background: var(--bg-dark);
}
</style>
