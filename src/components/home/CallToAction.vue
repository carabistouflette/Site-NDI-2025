<template>
  <section class="call-to-action">
    <div class="call-to-action__container">
      <n-grid x-gap="64" y-gap="32" cols="1 1024:2" item-responsive responsive="screen">
        <n-gi>
          <div class="call-to-action__content">
            <div class="call-to-action__text">
              <n-h2 class="call-to-action__title animate-fade-in">
                Rejoignez la 8ème édition de la Nuit de l'Informatique
              </n-h2>
              <p class="call-to-action__subtitle animate-slide-up">
                L'association NIRD vous invite à vivre une expérience unique le vendredi 21 mars 2025.
                Plus de 800 participants, 30 jeux interactifs et 25 conférenciers experts vous attendent
                pour co-créer le numérique de demain. Inscription gratuite, buffet inclus,
                et accès PMR garanti.
              </p>
              <div class="call-to-action__highlights animate-slide-up">
                <div class="highlight-item">
                  <span class="highlight-icon">🎓</span>
                  <span class="highlight-text">Certifications officielles</span>
                </div>
                <div class="highlight-item">
                  <span class="highlight-icon">🤝</span>
                  <span class="highlight-text">Networking avec experts</span>
                </div>
                <div class="highlight-item">
                  <span class="highlight-icon">🎁</span>
                  <span class="highlight-text">Goodies et surprises</span>
                </div>
              </div>
            </div>
            
            <div class="call-to-action__actions animate-slide-up">
              <NirdButton
                variant="unified"
                size="large"
                class="call-to-action__primary-btn"
                @click="$router.push('/games')"
              >
                <span class="btn-content">
                  <span>Réserver ma place</span>
                  <n-icon size="20" class="btn-icon">
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
                class="call-to-action__secondary-btn"
              >
                <span class="btn-content">
                  <span>Devenir partenaire</span>
                  <n-icon size="20" class="btn-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
                    </svg>
                  </n-icon>
                </span>
              </NirdButton>
            </div>
          </div>
        </n-gi>
        
        <n-gi>
          <div class="call-to-action__visual">
            <div class="call-to-action__gradient-orb call-to-action__gradient-orb--1"></div>
            <div class="call-to-action__gradient-orb call-to-action__gradient-orb--2"></div>
            <div class="call-to-action__gradient-orb call-to-action__gradient-orb--3"></div>
            <div class="call-to-action__floating-elements">
              <div class="floating-element floating-element--1">
                <div class="floating-element__icon">💡</div>
              </div>
              <div class="floating-element floating-element--2">
                <div class="floating-element__icon">🎮</div>
              </div>
              <div class="floating-element floating-element--3">
                <div class="floating-element__icon">🤝</div>
              </div>
              <div class="floating-element floating-element--4">
                <div class="floating-element__icon">⚡</div>
              </div>
            </div>
          </div>
        </n-gi>
      </n-grid>
    </div>
  </section>
</template>

<script setup lang="ts">
import { NGrid, NGi, NH2, NIcon } from 'naive-ui'
import NirdButton from '@/components/common/NirdButton.vue'
</script>

<style scoped>
@import '@/assets/styles/components/call-to-action.css';
</style>
