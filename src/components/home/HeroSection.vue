<template>
  <section class="hero-section">
    <div class="hero-section__container">
      <div class="hero-section__content">
        <div class="hero-section__title-wrapper">
          <h1 class="hero-section__title">
            <span class="hero-section__title-main animate-gradient">Nuit de l'Informatique</span>
            <span class="hero-section__title-year animate-gradient">2025</span>
          </h1>
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
          <NirdButton
            variant="unified"
            size="large"
            class="hero-section__primary-btn"
            @click="$router.push('/games')"
          >
            <span class="btn-content">
              <span>Explorer les jeux</span>
              <svg class="btn-icon" width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
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
        </div>
      </div>
      
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
    </div>
  </section>
</template>

<script setup lang="ts">
import NirdButton from '@/components/common/NirdButton.vue'
</script>

<style scoped>
.hero-section {
  min-height: 80vh;
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
}

.hero-section__container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  position: relative;
  z-index: 2;
}

.hero-section__content {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.hero-section__title-wrapper {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.hero-section__title {
  font-size: 3.5rem;
  font-weight: 700;
  line-height: 1.1;
  margin: 0;
  display: flex;
  flex-direction: column;
}

.hero-section__title-main {
  background: var(--gradient-unified);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  background-size: 200% auto;
  animation: gradient-shift 3s ease infinite;
}

.hero-section__title-year {
  font-size: 4rem;
  background: var(--gradient-digital);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-left: auto;
  background-size: 200% auto;
  animation: gradient-shift 3s ease infinite reverse;
}

.hero-section__slogan {
  position: relative;
  display: inline-block;
}

.hero-section__slogan-text {
  font-size: 1.5rem;
  font-weight: 600;
  background: var(--gradient-inclusive);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  display: block;
}

.hero-section__slogan-underline {
  position: absolute;
  bottom: -8px;
  left: 0;
  height: 3px;
  width: 100%;
  background: var(--gradient-inclusive);
  border-radius: 2px;
  transform: scaleX(0);
  transform-origin: left;
  animation: underline-expand 0.8s ease forwards;
  animation-delay: 0.5s;
}

.hero-section__description {
  max-width: 600px;
}

.hero-section__subtitle {
  font-size: 1.25rem;
  color: var(--nird-anthracite);
  line-height: 1.6;
  margin: 0 0 1.5rem 0;
  opacity: 0;
  animation: fade-in-up 0.8s ease forwards;
  animation-delay: 0.3s;
}

.hero-section__highlights {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  opacity: 0;
  animation: fade-in-up 0.8s ease forwards;
  animation-delay: 0.5s;
}

.highlight-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

.highlight-item:last-child {
  border-bottom: none;
}

.highlight-icon {
  font-size: 1.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  background: var(--gradient-digital);
  border-radius: 50%;
  color: white;
}

.highlight-text {
  font-size: 1rem;
  font-weight: 500;
  color: var(--nird-anthracite);
}

.hero-section__actions {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  opacity: 0;
  animation: fade-in-up 0.8s ease forwards;
  animation-delay: 0.6s;
}

.hero-section__primary-btn {
  position: relative;
  overflow: hidden;
}

.hero-section__primary-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.5s ease;
}

.hero-section__primary-btn:hover::before {
  left: 100%;
}

.btn-content {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.btn-icon {
  transition: transform 0.3s ease;
}

.hero-section__primary-btn:hover .btn-icon {
  transform: translateX(4px);
}

.hero-section__visual {
  position: relative;
  height: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.hero-section__gradient-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(40px);
  opacity: 0.7;
  animation: float 6s ease-in-out infinite;
}

.hero-section__gradient-orb--1 {
  width: 300px;
  height: 300px;
  background: var(--gradient-digital);
  top: 10%;
  left: 10%;
  animation-delay: 0s;
}

.hero-section__gradient-orb--2 {
  width: 250px;
  height: 250px;
  background: var(--gradient-inclusive);
  top: 50%;
  right: 20%;
  animation-delay: 2s;
}

.hero-section__gradient-orb--3 {
  width: 200px;
  height: 200px;
  background: var(--gradient-responsible);
  bottom: 10%;
  left: 30%;
  animation-delay: 4s;
}

.hero-section__floating-elements {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}

.floating-element {
  position: absolute;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  backdrop-filter: blur(10px);
  animation: float-element 8s ease-in-out infinite;
}

.floating-element--1 {
  top: 20%;
  right: 15%;
  background: rgba(0, 102, 255, 0.1);
  border: 2px solid rgba(0, 102, 255, 0.3);
  animation-delay: 0s;
}

.floating-element--2 {
  top: 60%;
  right: 25%;
  background: rgba(107, 70, 193, 0.1);
  border: 2px solid rgba(107, 70, 193, 0.3);
  animation-delay: 2s;
}

.floating-element--3 {
  bottom: 30%;
  left: 20%;
  background: rgba(255, 107, 107, 0.1);
  border: 2px solid rgba(255, 107, 107, 0.3);
  animation-delay: 4s;
}

.floating-element--4 {
  top: 40%;
  left: 15%;
  background: rgba(246, 173, 85, 0.1);
  border: 2px solid rgba(246, 173, 85, 0.3);
  animation-delay: 6s;
}

.floating-element__icon {
  font-size: 1.5rem;
  filter: grayscale(0.2);
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

@keyframes underline-expand {
  to {
    transform: scaleX(1);
  }
}

@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px) rotate(0deg);
  }
  50% {
    transform: translateY(-20px) rotate(5deg);
  }
}

@keyframes float-element {
  0%, 100% {
    transform: translateY(0px) rotate(0deg);
  }
  25% {
    transform: translateY(-15px) rotate(3deg);
  }
  50% {
    transform: translateY(-5px) rotate(-2deg);
  }
  75% {
    transform: translateY(-10px) rotate(1deg);
  }
}

.animate-gradient {
  animation: gradient-shift 3s ease infinite;
}

.animate-fade-in {
  animation: fade-in-up 0.8s ease forwards;
}

.animate-slide-up {
  opacity: 0;
  animation: fade-in-up 0.8s ease forwards;
}

@media (max-width: 1024px) {
  .hero-section__container {
    grid-template-columns: 1fr;
    gap: 2rem;
    text-align: center;
  }
  
  .hero-section__title {
    font-size: 2.5rem;
  }
  
  .hero-section__title-year {
    font-size: 3rem;
    margin-left: 0;
  }
  
  .hero-section__slogan-text {
    font-size: 1.25rem;
  }
  
  .hero-section__subtitle {
    margin: 0 auto 1.5rem auto;
    font-size: 1.125rem;
  }
  
  .hero-section__highlights {
    align-items: center;
    max-width: 400px;
    margin: 0 auto;
  }
  
  .highlight-item {
    justify-content: center;
  }
  
  .hero-section__actions {
    justify-content: center;
  }
  
  .hero-section__visual {
    height: 300px;
  }
  
  .floating-element {
    width: 50px;
    height: 50px;
  }
  
  .floating-element__icon {
    font-size: 1.25rem;
  }
}

@media (max-width: 768px) {
  .hero-section {
    min-height: 70vh;
    padding: 2rem 0;
  }
  
  .hero-section__title {
    font-size: 2rem;
  }
  
  .hero-section__title-year {
    font-size: 2.5rem;
  }
  
  .hero-section__slogan-text {
    font-size: 1.125rem;
  }
  
  .hero-section__subtitle {
    font-size: 1rem;
  }
  
  .hero-section__highlights {
    max-width: 300px;
  }
  
  .highlight-item {
    padding: 0.4rem 0;
  }
  
  .highlight-icon {
    width: 1.75rem;
    height: 1.75rem;
    font-size: 1.125rem;
  }
  
  .highlight-text {
    font-size: 0.9rem;
  }
  
  .hero-section__actions {
    flex-direction: column;
    align-items: center;
  }
  
  .hero-section__visual {
    height: 250px;
  }
  
  .hero-section__gradient-orb--1 {
    width: 200px;
    height: 200px;
  }
  
  .hero-section__gradient-orb--2 {
    width: 150px;
    height: 150px;
  }
  
  .hero-section__gradient-orb--3 {
    width: 120px;
    height: 120px;
  }
  
  .floating-element {
    width: 40px;
    height: 40px;
  }
  
  .floating-element__icon {
    font-size: 1rem;
  }
}
</style>