<template>
  <section class="event-info">
    <div class="event-info__container">
      <div class="event-info__header">
        <n-h2 class="event-info__title animate-fade-in">À propos de l'événement</n-h2>
        <p class="event-info__subtitle animate-slide-up">
          La Nuit de l'Informatique 2025 : une soirée immersive pour découvrir un numérique
          inclusif, responsable et durable à travers des expériences interactives uniques
        </p>
      </div>
      
      <div class="event-info__content">
        <n-grid x-gap="24" y-gap="24" cols="1 640:2 1024:4" item-responsive responsive="screen">
          <n-gi>
            <GradientCard variant="digital" class="event-info__card animate-card">
              <template #header>
                <div class="event-info__card-header">
                  <n-icon size="24" class="event-info__icon-wrapper">
                    <div class="event-info__icon">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
                      </svg>
                    </div>
                  </n-icon>
                  <h3>Date & Horaires</h3>
                </div>
              </template>
              <div class="event-info__details">
                <p><strong>Vendredi 21 mars 2025</strong></p>
                <p>18h00 - Minuit</p>
                <p>Entrée libre et gratuite</p>
                <p>Cérémonie d'ouverture à 18h30</p>
                <p>Buffet et rafraîchissements inclus</p>
                <p>Activités accessibles PMR</p>
              </div>
            </GradientCard>
          </n-gi>

          <n-gi>
            <GradientCard variant="inclusive" class="event-info__card animate-card">
              <template #header>
                <div class="event-info__card-header">
                  <div class="event-info__icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                    </svg>
                  </div>
                  <h3>Lieu</h3>
                </div>
              </template>
              <div class="event-info__details">
                <p><strong>Campus Universitaire Paris-Saclay</strong></p>
                <p>Bâtiment Breguet</p>
                <p>3 Rue Joliot-Curie</p>
                <p>91190 Gif-sur-Yvette, France</p>
                <p>RER B : Gif-sur-Yvette (10 min à pied)</p>
                <p>Bus : 91.06, 91.08 (Arrêt Moulon)</p>
              </div>
            </GradientCard>
          </n-gi>

          <n-gi>
            <GradientCard variant="responsible" class="event-info__card animate-card">
              <template #header>
                <div class="event-info__card-header">
                  <div class="event-info__icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  </div>
                  <h3>Programme</h3>
                </div>
              </template>
              <div class="event-info__details">
                <p><strong>18h00</strong> - Accueil des participants</p>
                <p><strong>18h30</strong> - Cérémonie d'ouverture</p>
                <p><strong>19h00</strong> - Lancement des jeux interactifs</p>
                <p><strong>20h30</strong> - Conférences thématiques</p>
                <p><strong>22h00</strong> - Remise des prix</p>
                <p><strong>22h30</strong> - Networking et clôture</p>
              </div>
            </GradientCard>
          </n-gi>
          
          <n-gi>
            <GradientCard variant="sustainable" class="event-info__card animate-card">
              <template #header>
                <div class="event-info__card-header">
                  <div class="event-info__icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
                    </svg>
                  </div>
                  <h3>Organisateurs</h3>
                </div>
              </template>
              <div class="event-info__details">
                <p><strong>Association NIRD</strong></p>
                <p>Numérique Inclusif Responsable et Durable</p>
                <p>Créée en 2018 par des étudiants passionnés</p>
                <p>En partenariat avec :</p>
                <p>• Université Paris-Saclay</p>
                <p>• Agence du Numérique</p>
                <p>• Tech For Good France</p>
                <p>• Fondation Mozilla</p>
              </div>
            </GradientCard>
          </n-gi>
        </n-grid>
        
        <div class="event-info__map-section">
          <GradientCard class="event-info__map-card animate-card">
            <template #header>
              <h3>Comment nous rejoindre ?</h3>
            </template>
            <n-grid x-gap="32" y-gap="32" cols="1 800:2" item-responsive responsive="screen">
              <n-gi>
                <div class="event-info__map-visual">
                  <div class="map-placeholder">
                    <div class="map-marker">
                      <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                      </svg>
                    </div>
                    <div class="map-text">
                      <p>Campus Universitaire Paris-Saclay</p>
                      <p>Bâtiment Breguet</p>
                    </div>
                  </div>
                </div>
              </n-gi>
              <n-gi>
                <div class="event-info__transport">
                  <h4>Accès transports</h4>
                  <div class="transport-options">
                    <div class="transport-option">
                      <span class="transport-icon">🚇</span>
                      <div>
                        <strong>Métro</strong>
                        <p>RER B - Gif-sur-Yvette</p>
                      </div>
                    </div>
                    <div class="transport-option">
                      <span class="transport-icon">🚊</span>
                      <div>
                        <strong>Tramway</strong>
                        <p>Bus 91.06, 91.08 - Arrêt Moulon</p>
                      </div>
                    </div>
                    <div class="transport-option">
                      <span class="transport-icon">🚌</span>
                      <div>
                        <strong>Bus</strong>
                        <p>Lignes 91.06, 91.08, 91.10</p>
                      </div>
                    </div>
                  </div>
                </div>
              </n-gi>
            </n-grid>
          </GradientCard>
        </div>
        
        <div class="event-info__description">
          <GradientCard class="event-info__about-card animate-card">
            <template #header>
              <h3>La Nuit de l'Informatique 2025</h3>
            </template>
            <p>
              La Nuit de l'Informatique est l'événement phare de l'association NIRD,
              organisé chaque année pour promouvoir un numérique plus inclusif, responsable
              et durable. Cette 8ème édition 2025 marque une étape importante avec plus de
              800 participants attendus pour une soirée riche en découvertes et en interactions.
            </p>
            <p>
              Fondée en 2018, l'association NIRD (Numérique Inclusif Responsable et Durable)
              rassemble étudiants, professionnels et passionnés autour d'une vision commune :
              rendre la technologie accessible à tous, éthique dans son développement et
              durable dans son impact. À travers des ateliers pratiques, des conférences
              inspirantes et des jeux éducatifs interactifs, nous explorons comment la technologie
              peut être un vecteur de changement positif dans notre société.
            </p>
            
            <n-grid x-gap="12" y-gap="24" cols="2 600:4" item-responsive responsive="screen" class="event-info__stats">
              <n-gi>
                <div class="stat animate-stat">
                  <span class="stat__number">800+</span>
                  <span class="stat__label">Participants</span>
                </div>
              </n-gi>
              <n-gi>
                <div class="stat animate-stat">
                  <span class="stat__number">30+</span>
                  <span class="stat__label">Jeux</span>
                </div>
              </n-gi>
              <n-gi>
                <div class="stat animate-stat">
                  <span class="stat__number">25+</span>
                  <span class="stat__label">Experts</span>
                </div>
              </n-gi>
              <n-gi>
                <div class="stat animate-stat">
                  <span class="stat__number">20+</span>
                  <span class="stat__label">Partenaires</span>
                </div>
              </n-gi>
            </n-grid>
          </GradientCard>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { NGrid, NGi, NH2, NIcon } from 'naive-ui'
import GradientCard from '@/components/common/GradientCard.vue'
</script>

<style scoped>
@import '@/assets/styles/components/event-info.css';
</style>
