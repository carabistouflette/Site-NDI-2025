<template>
  <section class="hero-section">
    <div class="hero-section__container">
      <n-grid x-gap="64" y-gap="32" cols="1 1024:2" item-responsive responsive="screen">
        <!-- Content Column -->
        <n-gi>
          <div class="hero-section__content">
            <div class="hero-section__title-wrapper">
              <n-space vertical :size="0">
                <span class="hero-section__title-main animate-gradient">Nuit de l'Informatique</span>
                <span class="hero-section__title-year animate-gradient">2025</span>
              </n-space>
              
              <div class="hero-section__slogan animate-fade-in">
                <span class="hero-section__slogan-text">L'innovation au service de l'inclusion</span>
                <div class="hero-section__slogan-underline"></div>
              </div>
            </div>
            
            <div class="hero-section__description animate-slide-up">
              <p class="hero-section__subtitle">
                Rejoignez-nous pour la 8ème édition de la Nuit de l'Informatique, organisée par l'association NIRD
                (Numérique Inclusif Responsable et Durable). Le vendredi 21 mars 2025, de 18h à minuit,
                vivez une soirée immersive au cœur de l'innovation numérique accessible à tous.
              </p>
              
              <div class="hero-section__highlights">
                <div class="highlight-item">
                  <span class="highlight-icon">📅</span>
                  <span class="highlight-text">Vendredi 21 mars 2025</span>
                </div>
                <div class="highlight-item">
                  <span class="highlight-icon">🕕</span>
                  <span class="highlight-text">18h - Minuit</span>
                </div>
                <div class="highlight-item">
                  <span class="highlight-icon">📍</span>
                  <span class="highlight-text">Campus Universitaire Paris-Saclay</span>
                </div>
              </div>
            </div>
            
            <div class="hero-section__actions animate-slide-up">
              <n-space :size="16" wrap justify="start" class="actions-space">
                <NirdButton
                  variant="unified"
                  size="large"
                  class="hero-section__primary-btn"
                  @click="$router.push('/games')"
                >
                  <span class="btn-content">
                    <span>Explorer les jeux</span>
                    <n-icon size="20">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M5 12H19M19 12L12 5M19 12L12 19"/>
                      </svg>
                    </n-icon>
                  </span>
                </NirdButton>
                
                <NirdButton
                  variant="digital"
                  type="tertiary"
                  size="large"
                  class="hero-section__secondary-btn"
                >
                  En savoir plus
                </NirdButton>
              </n-space>
            </div>
          </div>
        </n-gi>
        
        <!-- Visual Column -->
        <n-gi>
          <div class="hero-section__visual">
            <div class="hero-section__gradient-orb hero-section__gradient-orb--1"></div>
            <div class="hero-section__gradient-orb hero-section__gradient-orb--2"></div>
            <div class="hero-section__gradient-orb hero-section__gradient-orb--3"></div>
            
            <div class="hero-section__floating-elements">
              <div class="floating-element floating-element--1">
                <div class="floating-element__icon digital">💻</div>
              </div>
              <div class="floating-element floating-element--2">
                <div class="floating-element__icon inclusive">🤝</div>
              </div>
              <div class="floating-element floating-element--3">
                <div class="floating-element__icon responsible">🌍</div>
              </div>
              <div class="floating-element floating-element--4">
                <div class="floating-element__icon sustainable">♻️</div>
              </div>
            </div>
          </div>
        </n-gi>
      </n-grid>
    </div>
  </section>
</template>

<script setup lang="ts">
import { NGrid, NGi, NSpace, NIcon } from 'naive-ui'
import NirdButton from '@/components/common/NirdButton.vue'
</script>

<style>
@import '@/assets/styles/components/hero-section.css';

/* Styles spécifiques à Naive UI integration pour le responsive */
@media (max-width: 1024px) {
  .actions-space {
    justify-content: center;
  }
}
</style>
