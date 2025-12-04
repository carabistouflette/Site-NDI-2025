<template>
  <section class="call-to-action">
    <div class="call-to-action__container">
      <div class="call-to-action__content">
        <div class="call-to-action__text">
          <h2 class="call-to-action__title animate-fade-in">
            Prêt à révéler le potentiel du numérique inclusif ?
          </h2>
          <p class="call-to-action__subtitle animate-slide-up">
            Rejoignez-nous pour une soirée immersive où technologie, créativité et engagement
            se rencontrent. Ensemble, explorons comment construire un avenir numérique
            plus équitable, responsable et durable.
          </p>
          <div class="call-to-action__highlights animate-slide-up">
            <div class="highlight-item">
              <span class="highlight-icon">🚀</span>
              <span class="highlight-text">Expériences immersives</span>
            </div>
            <div class="highlight-item">
              <span class="highlight-icon">🎯</span>
              <span class="highlight-text">Apprentissage actif</span>
            </div>
            <div class="highlight-item">
              <span class="highlight-icon">🌍</span>
              <span class="highlight-text">Impact positif</span>
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
              <span>Commencer l'aventure</span>
              <svg class="btn-icon" width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </span>
          </NirdButton>
          <NirdButton
            variant="digital"
            type="tertiary"
            size="large"
            class="call-to-action__secondary-btn"
          >
            <span class="btn-content">
              <span>S'inscrire gratuitement</span>
              <svg class="btn-icon" width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </span>
          </NirdButton>
        </div>
      </div>
      
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
    </div>
  </section>
</template>

<script setup lang="ts">
import NirdButton from '@/components/common/NirdButton.vue'
</script>

<style scoped>
.call-to-action {
  padding: 4rem 0;
  background: linear-gradient(135deg, white 0%, #f8f9fa 100%);
  position: relative;
  overflow: hidden;
}

.call-to-action::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: var(--gradient-unified);
  opacity: 0.3;
}

.call-to-action__container {
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

.call-to-action__content {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.call-to-action__title {
  font-size: 2.5rem;
  font-weight: 700;
  line-height: 1.2;
  margin: 0;
  background: var(--gradient-unified);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  background-size: 200% auto;
  animation: gradient-shift 3s ease infinite;
}

.call-to-action__subtitle {
  font-size: 1.125rem;
  color: #6c757d;
  line-height: 1.6;
  margin: 0;
  max-width: 550px;
}

.call-to-action__highlights {
  display: flex;
  gap: 2rem;
  margin-top: 1.5rem;
  flex-wrap: wrap;
}

.highlight-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 1.5rem;
  background: rgba(0, 102, 255, 0.05);
  border-radius: 12px;
  border: 1px solid rgba(0, 102, 255, 0.1);
  transition: all 0.3s ease;
}

.highlight-item:hover {
  background: rgba(0, 102, 255, 0.1);
  transform: translateY(-3px);
  box-shadow: 0 8px 16px rgba(0, 102, 255, 0.15);
}

.highlight-icon {
  font-size: 1.5rem;
  flex-shrink: 0;
}

.highlight-text {
  font-weight: 600;
  color: var(--nird-anthracite);
  font-size: 0.95rem;
}

.call-to-action__actions {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.call-to-action__primary-btn {
  position: relative;
  overflow: hidden;
  box-shadow: 0 8px 16px rgba(0, 102, 255, 0.3);
}

.call-to-action__primary-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  transition: left 0.6s ease;
}

.call-to-action__primary-btn:hover::before {
  left: 100%;
}

.call-to-action__primary-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 24px rgba(0, 102, 255, 0.4);
}

.call-to-action__secondary-btn {
  position: relative;
  overflow: hidden;
}

.call-to-action__secondary-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(0, 102, 255, 0.2), transparent);
  transition: left 0.6s ease;
}

.call-to-action__secondary-btn:hover::before {
  left: 100%;
}

.call-to-action__secondary-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(0, 102, 255, 0.2);
}

.btn-content {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.btn-icon {
  transition: transform 0.3s ease;
}

.call-to-action__primary-btn:hover .btn-icon,
.call-to-action__secondary-btn:hover .btn-icon {
  transform: translateX(4px);
}

.call-to-action__visual {
  position: relative;
  height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.call-to-action__gradient-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(40px);
  opacity: 0.7;
  animation: float 6s ease-in-out infinite;
}

.call-to-action__gradient-orb--1 {
  width: 250px;
  height: 250px;
  background: var(--gradient-digital);
  top: 20%;
  left: 10%;
  animation-delay: 0s;
}

.call-to-action__gradient-orb--2 {
  width: 200px;
  height: 200px;
  background: var(--gradient-inclusive);
  top: 50%;
  right: 20%;
  animation-delay: 2s;
}

.call-to-action__gradient-orb--3 {
  width: 150px;
  height: 150px;
  background: var(--gradient-responsible);
  bottom: 20%;
  left: 30%;
  animation-delay: 4s;
}

.call-to-action__floating-elements {
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
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border: 2px solid rgba(0, 102, 255, 0.2);
  animation: float-element 8s ease-in-out infinite;
  transition: all 0.3s ease;
}

.floating-element:hover {
  transform: scale(1.1);
  border-color: var(--nird-blue-electric);
  box-shadow: 0 8px 16px rgba(0, 102, 255, 0.3);
}

.floating-element--1 {
  top: 15%;
  left: 15%;
  animation-delay: 0s;
}

.floating-element--2 {
  top: 60%;
  right: 15%;
  animation-delay: 2s;
}

.floating-element--3 {
  bottom: 25%;
  left: 25%;
  animation-delay: 4s;
}

.floating-element--4 {
  bottom: 40%;
  right: 25%;
  animation-delay: 6s;
}

.floating-element__icon {
  font-size: 1.5rem;
  transition: transform 0.3s ease;
}

.floating-element:hover .floating-element__icon {
  transform: scale(1.2);
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

.animate-fade-in {
  animation: fade-in 0.8s ease forwards;
}

.animate-slide-up {
  opacity: 0;
  animation: slide-up 0.8s ease forwards;
  animation-delay: 0.2s;
}

@media (max-width: 1024px) {
  .call-to-action__container {
    grid-template-columns: 1fr;
    gap: 2rem;
    text-align: center;
  }
  
  .call-to-action__title {
    font-size: 2rem;
  }
  
  .call-to-action__subtitle {
    margin: 0 auto;
  }
  
  .call-to-action__highlights {
    justify-content: center;
    gap: 1rem;
  }
  
  .highlight-item {
    padding: 0.75rem 1rem;
  }
  
  .call-to-action__actions {
    justify-content: center;
  }
  
  .call-to-action__visual {
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
  .call-to-action {
    padding: 3rem 0;
  }
  
  .call-to-action__title {
    font-size: 1.75rem;
  }
  
  .call-to-action__subtitle {
    font-size: 1rem;
  }
  
  .call-to-action__highlights {
    flex-direction: column;
    gap: 0.75rem;
  }
  
  .highlight-item {
    padding: 0.75rem 1rem;
  }
  
  .call-to-action__actions {
    flex-direction: column;
    align-items: center;
  }
  
  .call-to-action__visual {
    height: 250px;
  }
  
  .call-to-action__gradient-orb--1 {
    width: 200px;
    height: 200px;
  }
  
  .call-to-action__gradient-orb--2 {
    width: 150px;
    height: 150px;
  }
  
  .call-to-action__gradient-orb--3 {
    width: 100px;
    height: 100px;
  }
  
  .floating-element {
    width: 40px;
    height: 40px;
  }
  
  .floating-element__icon {
    font-size: 1rem;
  }
}

@media (max-width: 1024px) {
  .call-to-action__container {
    grid-template-columns: 1fr;
    gap: 2rem;
    text-align: center;
  }
  
  .call-to-action__title {
    font-size: 2rem;
  }
  
  .call-to-action__subtitle {
    margin: 0 auto;
  }
  
  .call-to-action__actions {
    justify-content: center;
  }
  
  .call-to-action__visual {
    height: 300px;
  }
}

@media (max-width: 768px) {
  .call-to-action {
    padding: 3rem 0;
  }
  
  .call-to-action__title {
    font-size: 1.75rem;
  }
  
  .call-to-action__subtitle {
    font-size: 1rem;
  }
  
  .call-to-action__actions {
    flex-direction: column;
    align-items: center;
  }
  
  .call-to-action__visual {
    height: 250px;
  }
  
  .call-to-action__gradient-orb--1 {
    width: 200px;
    height: 200px;
  }
  
  .call-to-action__gradient-orb--2 {
    width: 150px;
    height: 150px;
  }
  
  .call-to-action__gradient-orb--3 {
    width: 100px;
    height: 100px;
  }
}
</style>