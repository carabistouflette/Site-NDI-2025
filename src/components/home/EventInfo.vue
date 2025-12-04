<template>
  <section class="event-info">
    <div class="event-info__container">
      <div class="event-info__header">
        <h2 class="event-info__title">À propos de l'événement</h2>
        <p class="event-info__subtitle">
          La Nuit de l'Informatique est un événement unique qui célèbre le numérique sous toutes ses formes
        </p>
      </div>
      
      <div class="event-info__content">
        <div class="event-info__grid">
          <GradientCard variant="digital" class="event-info__card">
            <template #header>
              <div class="event-info__card-header">
                <div class="event-info__icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
                  </svg>
                </div>
                <h3>Date & Horaires</h3>
              </div>
            </template>
            <div class="event-info__details">
              <p><strong>Vendredi 15 mars 2025</strong></p>
              <p>18h00 - 23h00</p>
              <p>Entrée libre</p>
            </div>
          </GradientCard>
          
          <GradientCard variant="inclusive" class="event-info__card">
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
              <p><strong>Campus Universitaire</strong></p>
              <p>Paris, 15ème arrondissement</p>
              <p>Métro : Porte de Versailles</p>
            </div>
          </GradientCard>
          
          <GradientCard variant="responsible" class="event-info__card">
            <template #header>
              <div class="event-info__card-header">
                <div class="event-info__icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                </div>
                <h3>Thèmes</h3>
              </div>
            </template>
            <div class="event-info__details">
              <p><strong>Inclusif</strong> - Accessible à tous</p>
              <p><strong>Responsable</strong> - Éthique numérique</p>
              <p><strong>Durable</strong> - Impact environnemental</p>
            </div>
          </GradientCard>
          
          <GradientCard variant="sustainable" class="event-info__card">
            <template #header>
              <div class="event-info__card-header">
                <div class="event-info__icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
                  </svg>
                </div>
                <h3>Public</h3>
              </div>
            </template>
            <div class="event-info__details">
              <p><strong>Étudiants</strong> - Tous niveaux</p>
              <p><strong>Professionnels</strong> - Secteur numérique</p>
              <p><strong>Curieux</strong> - Passionnés de tech</p>
            </div>
          </GradientCard>
        </div>
        
        <div class="event-info__description">
          <GradientCard class="event-info__about-card">
            <template #header>
              <h3>Qu'est-ce que la Nuit de l'Informatique ?</h3>
            </template>
            <p>
              La Nuit de l'Informatique est un événement annuel organisé par l'association NIRD 
              qui vise à démocratiser le numérique et à promouvoir des pratiques plus inclusives, 
              responsables et durables dans le domaine de la technologie.
            </p>
            <p>
              À travers des ateliers, des conférences et des jeux interactifs, nous explorons 
              comment le numérique peut être un outil de transformation positive pour notre société.
            </p>
            <div class="event-info__stats">
              <div class="stat">
                <span class="stat__number">500+</span>
                <span class="stat__label">Participants</span>
              </div>
              <div class="stat">
                <span class="stat__number">20+</span>
                <span class="stat__label">Jeux & Ateliers</span>
              </div>
              <div class="stat">
                <span class="stat__number">15+</span>
                <span class="stat__label">Partenaires</span>
              </div>
            </div>
          </GradientCard>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import GradientCard from '@/components/common/GradientCard.vue'
</script>

<style scoped>
.event-info {
  padding: 4rem 0;
  background: white;
}

.event-info__container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.event-info__header {
  text-align: center;
  margin-bottom: 3rem;
}

.event-info__title {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--nird-anthracite);
  margin: 0 0 1rem 0;
  background: var(--gradient-unified);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.event-info__subtitle {
  font-size: 1.25rem;
  color: #6c757d;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
}

.event-info__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}

.event-info__card {
  height: 100%;
}

.event-info__card-header {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.event-info__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  flex-shrink: 0;
}

.event-info__details {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.event-info__details p {
  margin: 0;
  color: var(--nird-anthracite);
}

.event-info__description {
  max-width: 800px;
  margin: 0 auto;
}

.event-info__about-card {
  text-align: center;
}

.event-info__about-card p {
  color: var(--nird-anthracite);
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.event-info__stats {
  display: flex;
  justify-content: space-around;
  margin-top: 2rem;
  flex-wrap: wrap;
  gap: 2rem;
}

.stat {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.stat__number {
  font-size: 2rem;
  font-weight: 700;
  background: var(--gradient-digital);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.stat__label {
  font-size: 0.875rem;
  color: #6c757d;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

@media (max-width: 768px) {
  .event-info {
    padding: 3rem 0;
  }
  
  .event-info__title {
    font-size: 2rem;
  }
  
  .event-info__subtitle {
    font-size: 1.125rem;
  }
  
  .event-info__grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .event-info__stats {
    gap: 1rem;
  }
  
  .stat__number {
    font-size: 1.5rem;
  }
}
</style>