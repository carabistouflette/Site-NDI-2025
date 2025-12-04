<template>
  <div class="home-view">
    <n-layout>
      <n-layout-header>
        <AppHeader />
      </n-layout-header>
      
      <n-layout-content>
        <section id="accueil">
          <HeroSection />
        </section>
        
        <section id="evenement">
          <EventInfo />
        </section>
        
        <section id="jeux">
          <GamePreview />
        </section>
        
        <section id="contact">
          <CallToAction />
        </section>
      </n-layout-content>
      
      <n-layout-footer>
        <AppFooter />
      </n-layout-footer>
    </n-layout>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import AppHeader from '@/components/layout/AppHeader.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import HeroSection from '@/components/home/HeroSection.vue'
import EventInfo from '@/components/home/EventInfo.vue'
import GamePreview from '@/components/home/GamePreview.vue'
import CallToAction from '@/components/home/CallToAction.vue'

onMounted(() => {
  // Animation d'entrée pour les sections
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in')
      }
    })
  }, { threshold: 0.1 })

  // Observer toutes les sections
  document.querySelectorAll('section').forEach(section => {
    observer.observe(section)
  })
})
</script>

<style scoped>
.home-view {
  min-height: 100vh;
}

/* Animation supprimée temporairement pour débogage du rendu */
/* section {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}

section.fade-in {
  opacity: 1;
  transform: translateY(0);
} */
</style>