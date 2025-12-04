<template>
  <section class="hero-section">
    <div class="hero-section__container">
      <div class="hero-section__content">
        <h1 class="hero-section__title">
          <span class="hero-section__title-main">Nuit de l'Informatique</span>
          <span class="hero-section__title-year">2025</span>
        </h1>
        <p class="hero-section__subtitle">
          Découvrez un numérique inclusif, responsable et durable à travers des jeux éducatifs et interactifs
        </p>
        <div class="hero-section__actions">
          <NirdButton 
            variant="unified" 
            size="large"
            @click="$router.push('/games')"
          >
            Explorer les jeux
          </NirdButton>
          <NirdButton 
            variant="digital" 
            type="tertiary"
            size="large"
          >
            En savoir plus
          </NirdButton>
        </div>
      </div>
      
      <div class="hero-section__visual">
        <div class="hero-section__gradient-orb hero-section__gradient-orb--1"></div>
        <div class="hero-section__gradient-orb hero-section__gradient-orb--2"></div>
        <div class="hero-section__gradient-orb hero-section__gradient-orb--3"></div>
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
  gap: 1.5rem;
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
}

.hero-section__title-year {
  font-size: 4rem;
  background: var(--gradient-digital);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-left: auto;
}

.hero-section__subtitle {
  font-size: 1.25rem;
  color: var(--nird-anthracite);
  line-height: 1.6;
  max-width: 500px;
  margin: 0;
}

.hero-section__actions {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
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

@keyframes float {
  0%, 100% {
    transform: translateY(0px) rotate(0deg);
  }
  50% {
    transform: translateY(-20px) rotate(5deg);
  }
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
  
  .hero-section__subtitle {
    margin: 0 auto;
  }
  
  .hero-section__actions {
    justify-content: center;
  }
  
  .hero-section__visual {
    height: 300px;
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
  
  .hero-section__subtitle {
    font-size: 1.125rem;
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
}
</style>