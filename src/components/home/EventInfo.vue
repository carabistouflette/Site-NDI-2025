<template>
  <section class="event-info">
    <div class="event-info__container">
      <div class="event-info__header">
        <h2 class="event-info__title animate-fade-in">À propos de l'événement</h2>
        <p class="event-info__subtitle animate-slide-up">
          La Nuit de l'Informatique 2025 : une soirée immersive pour découvrir un numérique
          inclusif, responsable et durable à travers des expériences interactives uniques
        </p>
      </div>
      
      <div class="event-info__content">
        <div class="event-info__grid">
          <GradientCard variant="digital" class="event-info__card animate-card">
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
              <p><strong>Vendredi 21 mars 2025</strong></p>
              <p>18h00 - Minuit</p>
              <p>Entrée libre et gratuite</p>
              <p>Cérémonie d'ouverture à 18h30</p>
              <p>Buffet et rafraîchissements inclus</p>
              <p>Activités accessibles PMR</p>
            </div>
          </GradientCard>
          
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
        </div>
        
        <div class="event-info__map-section">
          <GradientCard class="event-info__map-card animate-card">
            <template #header>
              <h3>Comment nous rejoindre ?</h3>
            </template>
            <div class="event-info__map-content">
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
            </div>
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
            <div class="event-info__stats">
              <div class="stat animate-stat">
                <span class="stat__number">800+</span>
                <span class="stat__label">Participants attendus</span>
              </div>
              <div class="stat animate-stat">
                <span class="stat__number">30+</span>
                <span class="stat__label">Jeux interactifs</span>
              </div>
              <div class="stat animate-stat">
                <span class="stat__number">25+</span>
                <span class="stat__label">Conférenciers experts</span>
              </div>
              <div class="stat animate-stat">
                <span class="stat__number">20+</span>
                <span class="stat__label">Partenaires engagés</span>
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
  position: relative;
  overflow: hidden;
}

.event-info::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: var(--gradient-unified);
  opacity: 0.3;
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
  background-size: 200% auto;
  animation: gradient-shift 3s ease infinite;
}

.event-info__subtitle {
  font-size: 1.25rem;
  color: #6c757d;
  max-width: 700px;
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
  transition: all 0.3s ease;
}

.event-info__card:hover {
  transform: translateY(-5px);
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
  transition: all 0.3s ease;
}

.event-info__card:hover .event-info__icon {
  transform: scale(1.1);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.event-info__details {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.event-info__details p {
  margin: 0;
  color: var(--nird-anthracite);
  transition: color 0.3s ease;
}

.event-info__card:hover .event-info__details p {
  color: #2d3748;
}

.event-info__map-section {
  margin-bottom: 3rem;
}

.event-info__map-card {
  max-width: 800px;
  margin: 0 auto;
}

.event-info__map-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  align-items: center;
}

.event-info__map-visual {
  display: flex;
  justify-content: center;
  align-items: center;
}

.map-placeholder {
  width: 100%;
  height: 250px;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
  border: 2px solid rgba(0, 102, 255, 0.1);
}

.map-marker {
  color: var(--nird-blue-electric);
  margin-bottom: 1rem;
  animation: pulse 2s ease-in-out infinite;
}

.map-text {
  text-align: center;
  color: var(--nird-anthracite);
}

.map-text p {
  margin: 0.25rem 0;
  font-weight: 600;
}

.event-info__transport h4 {
  margin: 0 0 1rem 0;
  color: var(--nird-anthracite);
  font-size: 1.125rem;
}

.transport-options {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.transport-option {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: rgba(0, 102, 255, 0.05);
  border-radius: 8px;
  transition: all 0.3s ease;
}

.transport-option:hover {
  background: rgba(0, 102, 255, 0.1);
  transform: translateX(5px);
}

.transport-icon {
  font-size: 1.5rem;
  flex-shrink: 0;
}

.transport-option strong {
  display: block;
  color: var(--nird-anthracite);
  margin-bottom: 0.25rem;
}

.transport-option p {
  margin: 0;
  color: #6c757d;
  font-size: 0.875rem;
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
  transition: transform 0.3s ease;
}

.stat:hover {
  transform: scale(1.05);
}

.stat__number {
  font-size: 2rem;
  font-weight: 700;
  background: var(--gradient-digital);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  background-size: 200% auto;
  animation: gradient-shift 3s ease infinite;
}

.stat__label {
  font-size: 0.875rem;
  color: #6c757d;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

/* Animations */
@keyframes gradient-shift {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.1);
    opacity: 0.8;
  }
}

@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slide-up {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes card-appear {
  from {
    opacity: 0;
    transform: translateY(50px) scale(0.9);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@keyframes stat-grow {
  from {
    opacity: 0;
    transform: scale(0.5);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.animate-fade-in {
  animation: fade-in 0.8s ease forwards;
}

.animate-slide-up {
  opacity: 0;
  animation: slide-up 0.8s ease forwards;
  animation-delay: 0.2s;
}

.animate-card {
  opacity: 0;
  animation: card-appear 0.6s ease forwards;
}

.animate-card:nth-child(1) {
  animation-delay: 0.1s;
}

.animate-card:nth-child(2) {
  animation-delay: 0.2s;
}

.animate-card:nth-child(3) {
  animation-delay: 0.3s;
}

.animate-card:nth-child(4) {
  animation-delay: 0.4s;
}

.animate-stat {
  opacity: 0;
  animation: stat-grow 0.5s ease forwards;
}

.animate-stat:nth-child(1) {
  animation-delay: 0.1s;
}

.animate-stat:nth-child(2) {
  animation-delay: 0.2s;
}

.animate-stat:nth-child(3) {
  animation-delay: 0.3s;
}

.animate-stat:nth-child(4) {
  animation-delay: 0.4s;
}

@media (max-width: 1024px) {
  .event-info__map-content {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .event-info__stats {
    gap: 1.5rem;
  }
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
  
  .event-info__map-content {
    grid-template-columns: 1fr;
  }
  
  .map-placeholder {
    height: 200px;
  }
  
  .transport-options {
    gap: 0.75rem;
  }
  
  .transport-option {
    padding: 0.75rem;
  }
  
  .event-info__stats {
    gap: 1rem;
  }
  
  .stat__number {
    font-size: 1.5rem;
  }
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