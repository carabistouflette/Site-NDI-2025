<template>
  <section class="call-to-action">
    <div class="call-to-action__container">
      <div class="call-to-action__content">
        <div class="call-to-action__text">
          <h2 class="call-to-action__title">
            Prêt à explorer le numérique autrement ?
          </h2>
          <p class="call-to-action__subtitle">
            Rejoignez-nous pour une soirée de découvertes, d'apprentissage et de fun autour 
            des technologies qui façonnent notre avenir.
          </p>
        </div>
        
        <div class="call-to-action__actions">
          <NirdButton 
            variant="unified" 
            size="large"
            @click="$router.push('/games')"
          >
            Commencer à jouer
          </NirdButton>
          <NirdButton 
            variant="digital" 
            type="tertiary"
            size="large"
          >
            S'inscrire à l'événement
          </NirdButton>
        </div>
      </div>
      
      <div class="call-to-action__visual">
        <div class="call-to-action__gradient-orb call-to-action__gradient-orb--1"></div>
        <div class="call-to-action__gradient-orb call-to-action__gradient-orb--2"></div>
        <div class="call-to-action__gradient-orb call-to-action__gradient-orb--3"></div>
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
  background: white;
  position: relative;
  overflow: hidden;
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
}

.call-to-action__subtitle {
  font-size: 1.125rem;
  color: #6c757d;
  line-height: 1.6;
  margin: 0;
  max-width: 500px;
}

.call-to-action__actions {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
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

@keyframes float {
  0%, 100% {
    transform: translateY(0px) rotate(0deg);
  }
  50% {
    transform: translateY(-20px) rotate(5deg);
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